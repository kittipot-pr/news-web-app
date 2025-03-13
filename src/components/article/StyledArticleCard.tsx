import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type StyledArticleCardProps = {
  className?: string;
  image?: string;
  publishedAt?: string;
  title?: string;
  description?: string;
  source?: {
    name: string;
    url: string;
  };
} & React.ComponentProps<typeof Card>;

export function StyledArticleCard({
  className,
  image,
  publishedAt,
  title,
  description,
  source,
  ...props
}: StyledArticleCardProps) {
  return (
    <Card className={cn("w-full h-full flex flex-col rounded-lg p-0 gap-0 shadow-sm", className)} {...props}>
      {image && (
        <CardHeader className="w-full h-[325px] overflow-hidden p-0 rounded-t-lg">
          <Image
            src={image}
            alt={title ?? "Card image"}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
      </CardHeader>
      )}
      <CardContent className="flex-grow flex flex-col gap-2 p-4">
        {publishedAt && <p className="text-sm text-gray-500">{publishedAt}</p>}
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardContent>
      {source?.name && (
        <CardFooter className="flex justify-end px-4 pt-2 pb-4">
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline"
          >
            {source.name}
          </a>
        </CardFooter>
      )}
    </Card>

  );
}
