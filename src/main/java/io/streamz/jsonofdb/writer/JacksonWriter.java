/*
 *  Copyright 2011 ben.
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

package io.streamz.jsonofdb.writer;

import java.io.IOException;
import java.io.Writer;
import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author ben
 */
public class JacksonWriter implements IWriter<JsonNode>{

    private JsonFactory factory = new JsonFactory(new ObjectMapper());

    @Override
    public void writeData(JsonNode obj, Writer writer) throws IOException {
        JsonGenerator gen = factory.createJsonGenerator(writer);
        gen.writeTree(obj);
        gen.flush();
        gen.close();
    }

}
