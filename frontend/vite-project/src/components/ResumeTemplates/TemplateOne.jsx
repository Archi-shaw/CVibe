import React, { useEffect, useRef, useState } from 'react';
import {
  LuMapPinHouse,
  LuPhone,
  LuRss,
  LuGithub,
  LuUser,
  LuLinkedin,
  LuMail,
} from 'react-icons/lu';

import ContactInfo from '../ResumeSelections/ContactInfo';
import { formatYearMonth } from '../utils/helper';
import EducationInfo from '../ResumeSelections/EducationInfo';
import LanguageSection from '../ResumeSelections/LanguageInfo';
import WorkExperience from '../ResumeSelections/WorkExperience';
import Project from '../ResumeSelections/Project';
import SkillSection from '../ResumeSelections/SkillSection';
import CertificationInfo from '../ResumeSelections/CertificationInfo';

const DEFAULT_THEME = ['#EBFDFF', '#A1F4FD', '#CEFAFE', '#00B8DB', '#4A5565'];

const Title = ({ text, color }) => (
  <div className='relative w-fit mb-2.5'>
    <span
      className='absolute bottom-0 left-0 w-full h-2'
      style={{ backgroundColor: color }}
    />
    <h2 className='relative font-bold text-sm'>{text}</h2>
  </div>
);

const TemplateOne = ({ resumeData, colorPaletes, containerWidth }) => {
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const themeColors = colorPaletes?.length > 0 ? colorPaletes : DEFAULT_THEME;
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current?.offsetWidth || 800;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / actualBaseWidth);
  }, [containerWidth]);

  if (!resumeData) return <div>Loading...</div>;

  return (
    <div
      ref={resumeRef}
      className='p-3 bg-white'
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : 'none',
        transformOrigin: 'top left',
        width: containerWidth > 0 ? `${baseWidth}px` : 'auto',
        height: 'auto',
      }}
    >
      <div className='grid grid-cols-12 gap-8'>
        {/* Sidebar */}
        <div className='col-span-4 py-10' style={{ backgroundColor: themeColors[0] }}>
          <div className='flex flex-col items-center px-2'>
            <div
              className='w-[100px] h-[100px] max-w-[110px] max-h-[110px] rounded-full flex justify-center items-center'
              style={{ backgroundColor: themeColors[1] }}
            >
              {resumeData.profileinfo?.profilePreviewUrl ? (
                <img
                  src={resumeData.profileinfo.profilePreviewUrl}
                  className='w-[90px] h-[90px] rounded-full'
                  alt='Profile'
                />
              ) : (
                <div
                  className='w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full'
                  style={{ color: themeColors[4] }}
                >
                  <LuUser />
                </div>
              )}
            </div>
            <h2 className='text-2xl font-bold mt-3'>{resumeData?.profileinfo?.name}</h2>
            <p className='text-lg text-center'>{resumeData?.profileinfo?.designation}</p>
          </div>

          <div className='my-6 mx-6'>
            <div className='flex flex-col gap-3'>
              <ContactInfo
                icon={<LuMapPinHouse />}
                iconBg={themeColors[2]}
                value={resumeData.contactinfo?.location}
              />
              <ContactInfo
                icon={<LuMail />}
                iconBg={themeColors[2]}
                value={resumeData.contactinfo?.email}
              />
              <ContactInfo
                icon={<LuPhone />}
                iconBg={themeColors[2]}
                value={resumeData.contactinfo?.phone}
              />
              {resumeData.contactinfo?.linkedin && (
                <ContactInfo
                  icon={<LuLinkedin />}
                  iconBg={themeColors[2]}
                  value={resumeData.contactinfo.linkedin}
                />
              )}
              {resumeData.contactinfo?.github && (
                <ContactInfo
                  icon={<LuGithub />}
                  iconBg={themeColors[2]}
                  value={resumeData.contactinfo.github}
                />
              )}
              <ContactInfo
                icon={<LuRss />}
                iconBg={themeColors[2]}
                value={resumeData.contactinfo?.website}
              />
            </div>

            <div className='mt-5'>
              <Title text='Education' color={themeColors[1]} />
              {(resumeData.education || []).map((data, index) => (
                <EducationInfo
                  key={`edu_${index}`}
                  degree={data.degree || ''}
                  institution={data.institution || data.instituition || ''}
                  duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(
                    data.endDate
                  )}`}
                />
              ))}
            </div>

            <div className='mt-5'>
              <Title text='Languages' color={themeColors[1]} />
              <LanguageSection
                languages={resumeData.languages || []}
                accentColor={themeColors[1]}
                bgColor={themeColors[1]}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='col-span-8 pt-10 mr-10 pb-5'>
          <Title text='Professional Summary' color={themeColors[1]} />
          <p className='text-sm font-medium'>{resumeData.profileinfo?.summary}</p>

          <div className='mt-4'>
            <Title text='Work Experience' color={themeColors[1]} />
            {(resumeData.workexperience || []).map((data, index) => (
              <WorkExperience
                key={`work_${index}`}
                company={data.company}
                role={data.role}
                duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(
                  data.endDate
                )}`}
                durationColor={themeColors[4]}
                description={data.description}
              />
            ))}
          </div>

          <div className='mt-4'>
            <Title text='Projects' color={themeColors[1]} />
            {(resumeData.projects || []).map((data, index) => (
              <Project
                key={`proj_${index}`}
                title={data.title}
                description={data.description}
                github={data.github}
                livedemo={data.livedemo}
                bgColor={themeColors[1]}
              />
            ))}
          </div>

          <div className='mt-5'>
            <Title text='Skills' color={themeColors[1]} />
            <SkillSection
              skills={resumeData.skills || []}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />
          </div>

          <div className='mt-4'>
            <Title text='Certifications' color={themeColors[1]} />
            <div className='grid grid-cols-2 gap-2'>
              {(resumeData.certifications || []).map((data, index) => (
                <CertificationInfo
                  key={`cert_${index}`}
                  title={data.title}
                  issuer={data.issuer}
                  year={data.year}
                  bgColor={themeColors[2]}
                />
              ))}
            </div>
          </div>

          <div className='mt-4'>
            <Title text='Interests' color={themeColors[1]} />
            <div className='flex items-center flex-wrap gap-3 mt-4'>
              {(resumeData.interest || []).map((interest, index) => {
                if (!interest) return null;
                return (
                  <div
                    key={`interest_${index}`}
                    className='text-[10px] font-medium py-1 px-3 rounded-lg'
                    style={{ backgroundColor: themeColors[2] }}
                  >
                    {interest}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateOne;
