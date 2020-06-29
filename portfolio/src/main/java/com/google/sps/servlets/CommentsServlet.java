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

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

// Servlet to handle get and post request for comments
@WebServlet("/comments")
public class CommentsServlet extends HttpServlet {
    private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    private List<Comment> comments;
    private Gson gson = new Gson();

    @Override
    public void init() {
        comments = new ArrayList<>();
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);
        PreparedQuery resultsComments = datastore.prepare(query);

        // Iterate through array and get the text from object comment
        for (Entity entity : resultsComments.asIterable()) {
            long id = entity.getKey().getId();
            String name = (String) entity.getProperty("name");
            String comment = (String) entity.getProperty("comment");
            long timestamp = (long) entity.getProperty("timestamp");

            Comment commentEntity = new Comment(id, name, comment, timestamp);
            comments.add(commentEntity);
        }

        String json = gson.toJson(comments);
        response.setContentType("application/json;");
        response.getWriter().println(json);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Get the input from the form.
        String commentText = request.getParameter("comment-text-input");
        String commentName = request.getParameter("comment-name-input");
        long commentTimestamp = System.currentTimeMillis();

        // If there is a comment
        if(commentText != null){
            // Create comment entity
            Entity commentEntity = new Entity("Comment");

            //Set properties
            commentEntity.setProperty("comment", commentText);
            commentEntity.setProperty("name", commentName);
            commentEntity.setProperty("timestamp", commentTimestamp);
            
            // Store comment entity in datastore
            datastore.put(commentEntity);
        }
        response.sendRedirect("/index.html");
    }
}   
