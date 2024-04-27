import Image from 'next/image';
import FeatImage01 from '@/public/images/features-03-image-01.png';
import FeatImage02 from '@/public/images/features-03-image-02.png';
import FeatImage03 from '@/public/images/features-03-image-03.png';

export default function SixthSection() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-600">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4">Reach goals that matter</div>
            <p className="text-xl text-gray-400"> Improve your organization as a student with advanced features, ensuring everything is perfectly arranged for academic success.</p>
          </div>

          {/* Items */}
          <div className="grid gap-20">

            {/* 1st item */}
            <div className="md:flex md:items-center">
              {/* Image */}
              <div className="max-w-xl mx-auto mb-8 md:mb-0" data-aos="fade-up">
                <Image className="max-w-full h-auto md:max-w-md rounded-sm animated-image" src={FeatImage01} width={540} height={405} alt="Features 01" />
              </div>
              {/* Content */}
              <div className="max-w-xl mx-auto md:ml-8 md:order-first" data-aos="fade-right">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="font-architects-daughter text-xl text-yellow-600 mb-2">Student-Driven Study Planner</div>
                  <p className="text-xl text-gray-400 mb-4">Tailored for students preparing for exams and meeting assignment deadlines. Stay organized with our student-specific to-do list, designed by students for students.</p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    {/* List items */}
                  </ul>
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className="md:flex md:items-center">
              {/* Image */}
              <div className="max-w-xl mx-auto mb-8 md:mb-0" data-aos="fade-up">
                <Image className="max-w-full h-auto md:max-w-md rounded-sm animated-image" src={FeatImage02} width={540} height={405} alt="Features 02" />
              </div>
              {/* Content */}
              <div className="max-w-xl mx-auto md:ml-8" data-aos="fade-left">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="font-architects-daughter text-xl text-yellow-600 mb-2">Seamless Sharing and Collaboration</div>
                  <p className="text-xl text-gray-400 mb-4">Collaborate effortlessly with your class or your friends by sharing your to-do lists, enhancing teamwork and productivity.</p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    {/* List items */}
                  </ul>
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className="md:flex md:items-center">
              {/* Image */}
              <div className="max-w-xl mx-auto mb-8 md:mb-0" data-aos="fade-up">
                <Image className="max-w-full h-auto md:max-w-md rounded-sm animated-image" src={FeatImage03} width={540} height={405} alt="Features 01" />
              </div>
              {/* Content */}
              <div className="max-w-xl mx-auto md:ml-8 md:order-first" data-aos="fade-right">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="font-architects-daughter text-xl text-yellow-600 mb-2">Streamlined Task Management for Ultimate Organization</div>
                  <p className="text-xl text-gray-400 mb-4">Upgrade to a smarter to-do list with special features like nesting tasks, ensuring every assignment, task, and exam is perfectly organized.</p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    {/* List items */}
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
