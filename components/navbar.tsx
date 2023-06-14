"use client";

import * as React from "react";
import Link from "next/link";

import siteMetadata, { defaultAuthor } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const content: { title: string; href: string; description: string }[] = [
  {
    title: "Blog",
    href: "/posts",
    description: "Essays, guides, smol tips & tricks, and other written content.",
  },
  {
    title: "Speaking",
    href: "/speaking",
    description: "My previous (and current) talks, workshops, and other speaking engagements.",
  },
  {
    title: "Videos",
    href: defaultAuthor.social.youtube,
    description: "Videos about web development, solopreneurship, and other related topics.",
  },
  {
    title: "Newsletter",
    href: siteMetadata.newsletterUrl,
    description: "Aka Developreneur",
  },
  {
    title: "Teaching",
    href: "/teaching",
    description: "Mentoring, courses, tutorials, and other educational content.",
  },
  {
    title: "418 Podcast",
    href: "https://podcasters.spotify.com/pod/show/418-developreneur",
    description: "A podcast. Well, it will be eventually. Right now it's just one episode. But it's coming. I promise.",
  },
];

export function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Content</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {content.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  target={component.href.startsWith("http") ? "_blank" : "_self"}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/projects" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Projects</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/uses" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Uses</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/now" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Now</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          {/* TODO: Figure out how to type this */}
          {/* @ts-expect-error */}
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
