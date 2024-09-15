import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import messages from "@/utils/message.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  OVERVIEW_HEADER_SUBTITLE,
  OVERVIEW_HEADER_TITLE,
  OVERVIEW_TITLE,
  SIGNIN_BUTTON_TEXT,
} from "@/constants/constants";
import { ROUTES } from "@/constants/route";
import Container from "@/components/Container";
import { ModeToggle } from "@/components/theme/ModeToggle";

function OverviewPage() {
  return (
    <Container>
      <nav className="p-4 md:p-6 shadow-md dark:shadow-gray-600 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <a href="#" className="text-xl font-bold dark:text-slate-200">
              {OVERVIEW_TITLE}
            </a>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold ">
            {OVERVIEW_HEADER_TITLE}
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            {OVERVIEW_HEADER_SUBTITLE}
          </p>
        </section>

        <Carousel
          plugins={[AutoPlay({ delay: 2000 })]}
          className="w-full max-w-sm mb-8"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-5">
                  <Card className="bg-gray-50 shadow-lg rounded-lg p-4">
                    <CardHeader className="text-xl font-semibold text-gray-800 underline">
                      {message.title}
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-2">
                      <div className="relative aspect-w-4 aspect-h-4 flex justify-center items-center">
                        <img
                          src={message.imageUrl}
                          alt="PDF Preview"
                          className="object-contain w-64 h-56 rounded-lg shadow-md border border-gray-300"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-black dark:text-white" />
          <CarouselNext className="text-black dark:text-white" />
        </Carousel>

        <div className="flex flex-col items-center w-full max-w-sm gap-4">
          <Link to={ROUTES.SIGNUP} className="w-full">
            <Button className="w-full py-6 text-lg font-semibold">
              Create an account
            </Button>
          </Link>
          <div className="text-lg">
            Already have an account?{" "}
            <Link to={ROUTES.SIGNIN} className="text-blue-500 hover:underline">
              {SIGNIN_BUTTON_TEXT}
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center p-4 md:p-6 text-black dark:text-gray-200">
        © {new Date().getFullYear()} Notes Library. All rights reserved.
      </footer>
    </Container>
  );
}

export default OverviewPage;
