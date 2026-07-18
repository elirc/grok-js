/*
THINK-PREDICT Middleware
Order of middleware matters. Predict what happens if auth middleware runs after a short-circuiting static files middleware.
*/
Console.WriteLine("Middleware is the pipeline of the web story.");
