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
  SIGNUP_BUTTON_TEXT,
} from "@/constants/constants";
import { ROUTES } from "@/constants/route";

function OverviewPage() {
  return (
    <>
      <nav className="p-4 md:p-6 shadow-md dark:shadow-gray-600 bg-gray-900 text-white">
        <div className="container mx-auto flex flex-row md:flex-row items-center justify-between">
          <div>
            <a
              to="#"
              className="text-xl font-bold mb-4 md:mb-0 dark:text-slate-200"
            >
              {OVERVIEW_TITLE}
            </a>
          </div>
          <div className="flex gap-2">
            <Link to={ROUTES.SIGNUP} className="flex justify-end">
              <Button>{SIGNUP_BUTTON_TEXT}</Button>
            </Link>
            <Link to={ROUTES.SIGNIN} className="flex justify-end">
              <Button>{SIGNIN_BUTTON_TEXT}</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center py-44 sm:py-20 px-12 bg-gray-800 text-white">
        <section className="text-center mb-8 md:mb-12 px-5">
          <h1 className="text-3xl md:text-5xl font-bold">
            {OVERVIEW_HEADER_TITLE}
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            {OVERVIEW_HEADER_SUBTITLE}
          </p>
        </section>
        <Carousel
          plugins={[AutoPlay({ delay: 2000 })]}
          className="w-full max-w-sm"
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
          <CarouselPrevious className="text-black" />
          <CarouselNext className="text-black" />
        </Carousel>
      </main>

      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © {new Date().getFullYear()} Notes Library. All rights reserved.
      </footer>
    </>
  );
}

export default OverviewPage;
