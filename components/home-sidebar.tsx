"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Pencil } from "lucide-react";

import { projects } from "@/lib/projectsData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type CardProps = React.ComponentProps<typeof Card>;

export function Sidebar({ className, ...props }: CardProps) {
  return (
    <>
      <Card className={cn("mb-4", className)} {...props}>
        <CardHeader>
          <CardTitle>Where am I currently?</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center rounded-md pl-2 hover:bg-background/40 hover:backdrop-blur-lg">
            <MapPin />
            <p className="ml-2 mr-auto text-sm font-medium leading-none">Los Angeles</p>
            <Image
              src="/losangeles.jpg"
              alt="Los Angeles"
              width={56}
              height={56}
              className="h-16 w-16 rounded-md object-cover"
            />
          </div>
        </CardContent>
        <Separator />
        <CardFooter>
          <Button variant="ghost" className="w-full" disabled>
            Digital Nomad diaries <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      <Card className={cn(className)} {...props}>
        <CardHeader>
          <CardTitle>What am I working on?</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {projects.map((project) => (
            <Link
              href={project.href}
              target="_blank"
              key={project.title.trim()}
              className="flex items-center rounded-md pl-2 hover:bg-background/40 hover:backdrop-blur-lg"
            >
              <Pencil />
              <p className="ml-2 mr-auto text-sm font-medium leading-none">{project.title}</p>
              <Image
                src={project.imgSrc}
                alt={project.title}
                width={56}
                height={56}
                className="h-16 w-16 rounded-md object-cover"
              />
            </Link>
          ))}
        </CardContent>
        <Separator />
        <CardFooter>
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/projects">
              All projects <ArrowRight className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
