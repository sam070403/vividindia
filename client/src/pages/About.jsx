export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Us
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6 dark:text-white'>
            <p>
            Welcome to VividIndia, your trusted source for well-researched articles and thoughtful commentary on the issues that matter most today. 
            Our blog covers a wide range of topics, including social issues, technology, health and well-being, and finance. 
            Whether you're seeking fresh perspectives on current affairs, tips for a healthier lifestyle, or the latest trends in the tech world, we've got you covered.
            </p>

            <p>
            At VividIndia, we believe in the power of knowledge to inspire change. 
            Our mission is to create a platform where ideas flow freely and where our 
            readers can find meaningful insights to improve their lives and stay informed.
            Each piece is crafted with care, combining expert opinions with accessible content.
            </p>

            <p>
            We aim to bridge the gap between complex topics and our readers, providing 
            practical advice, industry trends, and thought-provoking discussions. 
            No matter your background, there's something for everyone here, from seasoned professionals to curious beginners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}