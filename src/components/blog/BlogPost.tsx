
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPostProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  content: string;
}

const BlogPost = ({ title, excerpt, category, date, author, readTime, image, content }: BlogPostProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <Badge variant="outline">{category}</Badge>
          <h1 className="text-4xl font-poppins font-bold">{title}</h1>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {author}
            </span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {date}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-video rounded-lg overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Quick Summary Dropdown */}
        <Card className="w-full cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Quick Summary</h3>
              <span className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>
            {isDropdownOpen && (
              <div className="mt-4 text-muted-foreground animate-fadeIn">
                <p>{excerpt}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
        />
      </div>
    </article>
  );
};

export default BlogPost;
