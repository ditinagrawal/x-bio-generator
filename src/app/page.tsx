"use client"

import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { UserInput } from "@/components/user-input";
import { UserOutput } from "@/components/user-output";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative grid grid-cols-1 slg:grid-cols-2 gap-12 px-4 py-12 sm:py-16 sm:px-8 md:px-10 slg:p-16 lg:p-24">
      <div className="col-span-full w-full flex flex-col items-center justify-center space-y-4 mb-4 text-center">
        <Link href={"https://github.com/ditinagrawal/x-bio-generator"} target="_blank" className="mb-4 group">
          <AnimatedGradientText className="px-6 py-2 rounded-full">
            <Star className="w-5 h-5 fill-yellow-300 text-yellow-400" />
            <hr className="mx-2 h-4 w-[1px] bg-gray-300" />
            Star on Github
            <ChevronRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </AnimatedGradientText>
        </Link>
        <a href="https://www.producthunt.com/posts/x-bio-generator?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-x&#0045;bio&#0045;generator" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=469889&theme=light" alt="X&#0032;Bio&#0032;Generator - Craft&#0032;the&#0032;perfect&#0032;X&#0032;bio&#0032;in&#0032;seconds&#0033; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
        <h1 className="uppercase font-extrabold text-7xl text-center w-full lg:w-[90%]">craft the perfect x bio in seconds!</h1>
        <p className="text-lg text-gray-600">Just a prompt, and we'll generate a custom bio for you.</p>
      </div>
      <UserInput />
      <UserOutput />
    </main>
  );
}
