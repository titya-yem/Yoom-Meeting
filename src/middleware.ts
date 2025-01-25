import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the protected routes
const protectedRoutes = createRouteMatcher([
  "/",
  "/upcoming",
  "/meeting(.*)",
  "/previous",
  "/recordings",
  "/personal-room",
]);

// Apply Clerk middleware to protect the routes
export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth(); // Await the auth() promise to get the actual auth object
  // Check if the current request matches any of the protected routes
  if (protectedRoutes(req)) {
    // Protect the route if it's a protected one
    authObject.protect();
  }
});

// Configure the matcher to apply the middleware to specific routes
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // Matches all routes except for static files and Next.js internals
    "/", // The root route
    "/(api|trpc)(.*)", // API and TRPC routes
  ],
};
