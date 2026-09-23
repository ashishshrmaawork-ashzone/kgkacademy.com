import course1 from '@/assets/images/courses/course-1.jpg';
import course2 from '@/assets/images/courses/course-2.jpg';
import course3 from '@/assets/images/courses/course-3.jpg';
import course4 from '@/assets/images/courses/course-4.jpg';
import course5 from '@/assets/images/courses/course-5.jpg';
import course6 from '@/assets/images/courses/course-6.jpg';
import course7 from '@/assets/images/courses/course-7.jpg';
import course8 from '@/assets/images/courses/course-8.jpg';
import course9 from '@/assets/images/courses/course-9.jpg';

export const allCourses = {
  surat: [
    {
      slug: 'graduate-in-diamonds-surat',
      title: 'Graduate in Diamonds',
      city: 'Surat',
      category: 'diamond',
      image: course1,
      intro: 'The Graduate in Diamonds program is a comprehensive, industry-focused course designed to provide complete knowledge of the diamond journey from rough stone to polished gem. This program combines theory, practical training, and real factory exposure, making students fully prepared for careers in the diamond industry.',
      duration: '6 Months',
      level: 'Beginner to Intermediate',
    },
    {
      slug: 'diamond-grading-surat',
      title: 'Diamond Grading Course',
      city: 'Surat',
      category: 'diamond',
      image: course2,
      intro: 'This course provides in-depth training on the 4Cs of diamond grading — Cut, Colour, Clarity, and Carat. Students gain hands-on experience using industry-standard grading tools and GIA-recognised methods used by professional gemologists worldwide.',
      duration: '3 Months',
      level: 'Beginner',
    },
    {
      slug: 'rough-diamond-grading-surat',
      title: 'Rough Diamond Grading Course',
      city: 'Surat',
      category: 'diamond',
      image: course3,
      intro: 'Learn to assess and grade rough diamonds like a professional. This program covers rough diamond identification, quality assessment, market value estimation, and sorting techniques used by experts in the diamond trade.',
      duration: '3 Months',
      level: 'Intermediate',
    },
    {
      slug: 'rough-diamond-manufacturing-surat',
      title: 'Rough Diamond Manufacturing',
      city: 'Surat',
      category: 'diamond',
      image: course4,
      intro: 'A hands-on course covering the complete manufacturing process from rough to polished diamond. Students learn sawing, bruting, faceting, and polishing — the core techniques of the diamond manufacturing industry.',
      duration: '4 Months',
      level: 'Intermediate',
    },
    {
      slug: 'diploma-diamond-surat',
      title: 'Diploma in Diamond',
      city: 'Surat',
      category: 'diamond',
      image: course5,
      intro: 'An advanced diploma program that covers the complete diamond value chain. From mining to market, students gain comprehensive knowledge of diamond quality, grading, trade practices, and industry standards.',
      duration: '12 Months',
      level: 'Advanced',
    },
    {
      slug: 'coloured-gemstone-surat',
      title: 'Diploma in Coloured Gemstone',
      city: 'Surat',
      category: 'colorstone',
      image: course6,
      intro: 'This program specialises in coloured gemstone identification, quality assessment, and market valuation. Students gain expertise in rubies, emeralds, sapphires, and other precious and semi-precious gemstones used in fine jewellery.',
      duration: '6 Months',
      level: 'Intermediate to Advanced',
    },
  ],
  jaipur: [
    {
      slug: 'graduate-in-diamonds-jaipur',
      title: 'Graduate in Diamonds',
      city: 'Jaipur',
      category: 'diamond',
      image: course1,
      intro: 'The Graduate in Diamonds program is a comprehensive, industry-focused course designed to provide complete knowledge of the diamond journey from rough stone to polished gem. This program combines theory, practical training, and real factory exposure, making students fully prepared for careers in the diamond industry.',
      duration: '6 Months',
      level: 'Beginner to Intermediate',
    },
    {
      slug: 'jewellery-design-jaipur',
      title: 'Diploma in Jewellery Designing',
      city: 'Jaipur',
      category: 'colorstone',
      image: course7,
      intro: 'A creative and technical course covering jewellery design fundamentals, CAD software, stone setting techniques, and manufacturing processes. Students develop both artistic and commercial skills needed for the jewellery design industry.',
      duration: '6 Months',
      level: 'Beginner to Intermediate',
    },
    {
      slug: 'gemstone-identification-jaipur',
      title: 'Gemstone Identification Course',
      city: 'Jaipur',
      category: 'colorstone',
      image: course8,
      intro: 'Learn to identify and classify coloured gemstones with accuracy and confidence. This course covers visual and instrument-based identification of precious and semi-precious stones, preparing students for roles in gem trading and retail.',
      duration: '2 Months',
      level: 'Beginner',
    },
    {
      slug: 'diamond-grading-jaipur',
      title: 'Diamond Grading Course',
      city: 'Jaipur',
      category: 'diamond',
      image: course2,
      intro: 'This course provides in-depth training on the 4Cs of diamond grading. Students gain hands-on experience using industry-standard grading tools and GIA-recognised methods used by professional gemologists worldwide.',
      duration: '3 Months',
      level: 'Beginner',
    },
    {
      slug: 'coloured-gemstone-jaipur',
      title: 'Diploma in Coloured Gemstone',
      city: 'Jaipur',
      category: 'colorstone',
      image: course6,
      intro: 'Specialising in coloured gemstone identification, quality assessment, and market valuation. Students gain expertise in rubies, emeralds, sapphires, and other precious and semi-precious gemstones used in fine jewellery.',
      duration: '6 Months',
      level: 'Intermediate',
    },
    {
      slug: 'gem-lab-jaipur',
      title: 'Gem Lab Technology Course',
      city: 'Jaipur',
      category: 'colorstone',
      image: course9,
      intro: 'A technical course focused on gemological laboratory instruments and testing procedures. Students learn to use refractometers, spectroscopes, polariscopes, and other professional gem testing equipment.',
      duration: '2 Months',
      level: 'Intermediate',
    },
  ],
};

export const allCoursesFlat = [...allCourses.surat, ...allCourses.jaipur];
