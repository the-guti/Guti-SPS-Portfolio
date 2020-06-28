// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package com.google.sps.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/json")
public class JsonServlet extends HttpServlet {
    private ArrayList<String> messages;
    private Gson gson = new Gson();

    @Override
    public void init() {
        messages = new ArrayList<>()
        /*
        messages.add("{\"message\": \"mess 1\",\"name\": \"Juan\"}");
        messages.add("{\"message\": \"mess 2\",\"name\": \"not juan\"}");
        messages.add("{\"message\": \"mess 3\",\"name\": \"maybe sJuan\"}");
        */
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String json = gson.toJson(messages);
        response.setContentType("application/json;");
        response.getWriter().println(json);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Get the input from the form.
        String commentText = request.getParameter("comment-text-input");
        String commentName = request.getParameter("comment-name-input");

        // If there is a comment
        if(commentText != null){
            // Respond with the result. 
            String json = gson.toJson(commentName, commentText);
            //System.out.println("\n json java serverlket",json);
            messages.add(json);
            // response.setContentType("text/html;");
            // response.getWriter().println(commentText);
        }
        response.sendRedirect("/index.html");
    }
}   
