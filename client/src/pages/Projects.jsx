import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: 'Social Issues Awareness Campaign',
    description: 'Explore how our blog raises awareness about social issues through impactful articles and collaborations.',
    link: '/projects/social-issues',
  },
  {
    title: 'Tech Innovations Series',
    description: 'Dive into emerging technologies with our series of in-depth analyses, tutorials, and expert interviews.',
    link: '/projects/tech-innovations',
  },
  {
    title: 'Health & Well-Being Challenges',
    description: 'Join our 30-Day Wellness Challenge and other initiatives to improve your mental and physical health.',
    link: '/projects/health-wellbeing',
  },
  {
    title: 'Financial Literacy Programs',
    description: 'Get to know personal finance, investments, and budgeting through our easy-to-follow guides and tools.',
    link: '/projects/financial-literacy',
  },
  {
    title: 'Guest Author Series',
    description: 'Read special articles and interviews from guest writers and experts contributing to our blog.',
    link: '/projects/guest-authors',
  },
  {
    title: 'Community Engagement Projects',
    description: 'Discover projects driven by our readers, including article submissions and topic suggestions.',
    link: '/projects/community-engagement',
  },
];

export default function Projects() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Our Projects</h1>
      <p className="text-lg mb-8">
        Our blog is more than just articles. We engage in various projects aimed at making a positive impact in different areas.
        Explore our current and past projects to see how we're making a difference.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{project.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
            <Link
              to={project.link}
              className="text-teal-500 hover:underline"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
