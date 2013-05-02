<%-- any content can be specified here e.g.: --%>
<%@page import="com.google.gson.Gson"%>
<%@page import="com.google.gson.JsonObject"%>
<%@ page pageEncoding="utf-8" %>
<%
    JsonObject obj = new JsonObject();

    obj.addProperty("name", System.getProperty("os.name"));
    obj.addProperty("version", System.getProperty("os.version"));
    obj.addProperty("arch", System.getProperty("os.arch"));
    obj.addProperty("runtime", System.getProperty("java.runtime.version"));
    obj.addProperty("vendor", System.getProperty("java.vm.vendor"));
    obj.addProperty("freemem", Long.toString(Runtime.getRuntime().freeMemory()) + " bytes");
    obj.addProperty("totalmem", Long.toString(Runtime.getRuntime().totalMemory()) + " bytes");
    obj.addProperty("maxmem", Long.toString(Runtime.getRuntime().maxMemory()) + " bytes");
    obj.addProperty("procs", Long.toString(Runtime.getRuntime().availableProcessors()));

    Gson gson = new Gson();
    out.write("{rows:[" + gson.toJson(obj) + "]}");
    out.flush();
%>
