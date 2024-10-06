import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // ยกเว้นเส้นทางของ Next.js และไฟล์ static
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // ทำงานเสมอสำหรับ API routes
    '/(api|trpc)(.*)',
  ],
};
