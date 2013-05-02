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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import java.io.IOException;
import java.io.Writer;

/**
 *
 * @author ben
 */
public class GsonWriter implements IWriter<JsonElement>{

    private Gson gson = new GsonBuilder().serializeNulls().create();

    @Override
    public void writeData(JsonElement obj, Writer writer) throws IOException {
        gson.toJson(obj, writer);
    }
}
