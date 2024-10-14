import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NOTES_FEEDBACK_LINK } from "@/constants/constants";
import { ArrowRight, MessageSquare, UserCheck, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

function FeedbackPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16 space-y-16">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Welcome to Notes Feedback
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Enhance your learning experience by providing valuable feedback on
            curated notes. Join our community and help shape the future of
            education.
          </p>
          <div>
            <Link
              to={NOTES_FEEDBACK_LINK}
              target="_blank"
              className="mt-8"
              size="lg"
            >
              <Button>
                Join Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: MessageSquare,
              title: "Provide Feedback",
              description: "Share your thoughts on admin-curated notes",
            },
            {
              icon: UserCheck,
              title: "Expert Content",
              description: "Access high-quality notes from verified admins",
            },
            {
              icon: ThumbsUp,
              title: "Improve Learning",
              description: "Help enhance educational content for everyone",
            },
          ].map((feature) => (
            <Card
              key={feature.title}
              className="overflow-hidden transition-all duration-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="rounded-full p-3 bg-gray-100 dark:bg-gray-700">
                  <feature.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Notes Feedback. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default FeedbackPage;
