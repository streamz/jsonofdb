/*
 *  Copyright 2010 bgordon.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *  under the License.
 */
package io.streamz.jsonofdb.dao;

import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.JsonNodeFactory;
import org.codehaus.jackson.node.ObjectNode;
import io.streamz.jsonofdb.util.JsonofdbException;
import io.streamz.jsonofdb.util.TransactionTimer;
import io.streamz.jsonofdb.util.TransactionTimer.Resolution;
import io.streamz.jsonofdb.writer.JacksonWriter;

import javax.sql.DataSource;
import java.io.Writer;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class JacksonDBExecutor implements IDBExecutor {

    private final DataSource datasource;
    private final JacksonWriter jackson;

    public JacksonDBExecutor(DataSource datasource) {
        this.datasource = datasource;
        this.jackson = new JacksonWriter();
    }

    @Override
    public void execute(DBQuery query, Writer writer) throws JsonofdbException {
        Connection connection = null;
        Statement statement = null;

        try
        {
            connection = datasource.getConnection();
            connection.setAutoCommit(true);

            statement = connection.createStatement(
                    ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);

            int rc = 0;
            int cc = 0;

            ObjectNode json = new ObjectNode(JsonNodeFactory.instance);
            ArrayNode rows = new ArrayNode(JsonNodeFactory.instance);
            
            TransactionTimer timer = new TransactionTimer(Resolution.MILLISECONDS);

            if (statement.execute(query.getSQLStatement())) {
                ResultSet rs = statement.getResultSet();
                ResultSetMetaData rmd = rs.getMetaData();

                cc = rmd.getColumnCount();

                // get the metadata
                List<String> columnNames = new ArrayList<String>(cc);

                for (int i = 1; i <= cc; ++i)
                    columnNames.add(rmd.getColumnName(i));

                ObjectNode row;
                
                while (rs.next()) {
                    row = new ObjectNode(JsonNodeFactory.instance);

                    for (int i = 1; i <= cc; ++i)
                        row.put(columnNames.get(i - 1), DaoUtils.getStringValue(rs, i));
                    
                    rows.add(row);
                }

                rc = rows.size();
            }
            else {
                rc = statement.getUpdateCount();
            }

            ObjectNode header = new ObjectNode(JsonNodeFactory.instance);

            header.put("rows", rc);
            header.put("cols", cc);
            header.put("time", timer.getTime());
            header.put("version", "1.0");

            json.put("header", header);
            json.put("records", rows);

            jackson.writeData(json, writer);
        }
        catch (Exception ex)
        {
            throw new JsonofdbException(ex);
        }
        finally
        {
            DaoUtils.closeResources(statement, connection);
        }
    }
}
