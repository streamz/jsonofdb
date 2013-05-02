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

import io.streamz.jsonofdb.util.JsonofdbException;
import java.util.List;
import javax.ws.rs.core.MultivaluedMap;

public class DBQuery
{
    private static final String SELECT = "SELECT";
    private static final String SQL = "sql";
    private static final String START = "start";
    private static final String COUNT = "count";
    private static final String LIMIT = " LIMIT %s";
    private static final String OFFSET = " OFFSET %s";
    
    private final MultivaluedMap<String, String> queryParams;
    private final boolean raw;
    
    /**
     * @param raw
     * @param queryParams
     */
    public DBQuery(MultivaluedMap<String, String> queryParams, boolean raw)
    {
        this.queryParams = queryParams;
        this.raw = raw;
    }
    
    /**
     * @return
     */
    public String getSQLStatement() throws JsonofdbException
    {
        return raw ? getRaw() : getSelect();
    }
 
    /**
     * @return
     */
    private String getOffset()
    {
        List<String> res = queryParams.get(START);
        return (res != null) ? String.format(OFFSET, res.get(0)) : "";
    }
    
    /**
     * @return
     */
    private String getLimit()
    {
        List<String> res = queryParams.get(COUNT);
        return (res != null) ? String.format(LIMIT, res.get(0)) : "";
    }
    
    /**
     * @return
     */
    private String getSelect() throws JsonofdbException
    {
        String sql = getRaw();
        String normSQL = sql.toUpperCase();
        
        if (!normSQL.startsWith(SELECT))
            throw new JsonofdbException("Not a SELECT statement.");
        
        return sql + getLimit() + getOffset();
    }
    
    /**
     * @return
     */
    private String getRaw() throws JsonofdbException
    {
        List<String> res = queryParams.get(SQL);
        
        if ((res == null) ||(res.isEmpty()))
            throw new JsonofdbException("Invalid SQL");
        
        return res.get(0);
    }
}
