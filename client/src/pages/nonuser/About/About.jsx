import React from 'react';
import './About.scss';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className='about-wrapper'>
      <motion.h1
        animate={{ y: 20 }}
        transition={{ ease: "easeIn", duration: 1.5 }}
      >What are we ?
      </motion.h1>
      <p>Blossom is a dedicated nonprofit organization committed to uplifting underprivileged communities through a variety of impactful initiatives. With a steadfast focus on fundraising, charity, events, and volunteer services, Blossom strives to make a meaningful difference in the lives of those in need. By mobilizing resources and fostering a spirit of compassion and support, Blossom endeavors to create opportunities for disadvantaged individuals and families to thrive. Through their unwavering dedication and community-driven approach, Blossom serves as a beacon of hope and empowerment, aiming to build a brighter future for all.</p>

      <h3>Founding Principles</h3>
      <ul>
        <li>
          Blooming Impact : Blossom strives to facilitate impactful fundraises, ensuring that every dollar raised has a direct and positive effect on the cause it supports. We believe in the potential of small acts coming together to create significant change.
        </li>
        <li>
          Seed of Empathy : The project is rooted in the belief that empathy is the seed from which compassion blossoms. By fostering understanding and awareness, Blossom aims to inspire a collective sense of responsibility for the well-being of our global community.
        </li>
        <li>
          Volunteer Harmony : Blossom recognizes the invaluable contribution of volunteers and seeks to connect passionate individuals with opportunities that align with their skills and interests. Through volunteer services, we aim to create a network of change-makers who actively contribute to building a better world.
        </li>
      </ul>

      <h3>Key Initiatives</h3>

      <ul>
        <li>Blossom Fundraisers: Engage in a variety of fundraisers, ranging from online campaigns to community events, to support a diverse array of causes, including education, healthcare, environmental conservation, and more.</li>
        <li>
          Charity Bloom: Direct and transparent charity donation mechanisms that ensure funds reach their intended recipients efficiently. We believe in fostering trust and accountability in the donation process.
        </li>
        <li>Volunteer Hub: Connect individuals with volunteer opportunities based on their skills, interests, and geographical location. By creating a harmonious volunteer ecosystem, Blossom seeks to maximize the positive impact of dedicated individuals.</li>
      </ul>

      <h3>Why Blossom?</h3>
      <ul>
        <li>Inclusive: Blossom is committed to inclusivity, embracing a wide range of causes to address the multifaceted challenges faced by communities globally.</li>
        <li>Transparency: We prioritize transparency in all our operations, ensuring that donors and volunteers have a clear understanding of how their contributions are making a difference.</li>
        <li>Community-Centric: Blossom is built on the idea that positive change is most effective when driven by a united community. Together, we can create a world where compassion and generosity flourish.</li>
      </ul>
      <p>Join us in the journey to make the world bloom with kindness and positive change. Together, let's sow the seeds of a brighter future through Project Blossom.</p>
    </div>
  )
}

export default About;