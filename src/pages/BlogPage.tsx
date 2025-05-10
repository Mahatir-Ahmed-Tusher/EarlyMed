import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BlogPage() {
  const blogs = [
    {
      title: "AI in Healthcare: The Future of Medical Diagnosis",
      path: "/blog/ai-healthcare",
      author: "Saket Choudhary Kongara",
      date: "March 15, 2024",
      excerpt: "Exploring how artificial intelligence is revolutionizing medical diagnosis and treatment planning.",
      category: "Technology",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=700"
    },
    {
      title: "The Importance of Early Disease Detection",
      path: "/blog/early-detection",
      author: "Mahatir Ahmed Tusher",
      date: "March 10, 2024",
      excerpt: "Understanding the importance of early disease detection and regular health screenings.",
      category: "Health Tips",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=700"
    },
    {
      title: "Understanding Cardiovascular Health: Risk Factors and Prevention",
      path: "/blog/cardiovascular-health",
      author: "Dr. Zarin Nabila",
      date: "March 20, 2024",
      excerpt: "A comprehensive guide to heart health, risk assessment, and preventive measures.",
      category: "Heart Health",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=700"
    },
    {
      title: "Nutrition Guidelines for Disease Prevention",
      path: "/blog/nutrition-guidelines",
      author: "Dr. Zafrul Hasan Pronoy",
      date: "March 22, 2024",
      excerpt: "How your diet plays a crucial role in preventing various health conditions and diseases.",
      category: "Nutrition",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=700"
    },
    {
      title: "Mental Health Awareness: Early Signs and Support",
      path: "/blog/mental-health",
      author: "Dr. Srinivasa Manish",
      date: "March 25, 2024",
      excerpt: "Recognizing the early warning signs of mental health issues and how to seek support.",
      category: "Mental Health",
      readTime: "5 min read",
      image: "https://i.postimg.cc/2yR6g8zh/image.png"
    },
    {
      title: "The Impact of Sleep on Overall Health",
      path: "/blog/sleep-health",
      author: "Vangapalli Sivamani",
      date: "March 28, 2024",
      excerpt: "Understanding how quality sleep affects your physical and mental well-being.",
      category: "Wellness",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&q=80&w=700"
    },
    {
      title: "Building a Strong Immune System",
      path: "/blog/immune-system",
      author: "Dr. Sharaf Wasima",
      date: "March 30, 2024",
      excerpt: "Natural ways to boost your immunity and protect against diseases.",
      category: "Immunity",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=700"
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories for the dropdown
  const categories = ["All", ...new Set(blogs.map(blog => blog.category))];

  // Filter blogs based on search term and selected category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Select first 3 blogs as featured
  const featuredBlogs = blogs.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 pt-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">Latest Health Insights</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the latest medical research, health tips, and expert advice from leading healthcare professionals.
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center items-center">
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <Select onValueChange={setSelectedCategory} value={selectedCategory}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Featured Articles Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-primary">Featured Articles</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredBlogs.map((blog, index) => (
            <Card key={index} className="group hover:shadow-xl transition-shadow duration-300 border-teal-500 border-2">
              <Link to={blog.path} className="no-underline">
                <CardHeader>
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold mt-4 text-primary group-hover:text-teal-600 transition-colors">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="mb-2">{blog.category}</Badge>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{blog.excerpt}</p>
                  <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{blog.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* All Blogs Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-primary">All Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <Link to={blog.path} className="no-underline">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Badge variant="secondary" className="mb-2">{blog.category}</Badge>
                    </div>
                    <h2 className="text-xl font-bold mb-3 text-primary group-hover:text-primary/80 transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center text-sm text-muted-foreground gap-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground col-span-3">No blogs found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}