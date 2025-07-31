import React, { useEffect, useRef, useState } from 'react';
import {
  LuMapPin,
  LuPhone,
  LuMail,
  LuLinkedin,
  LuGithub,
  LuGlobe,
  LuUser,
  LuExternalLink
} from 'react-icons/lu';

import { formatYearMonth } from '../utils/helper';
import ContactInfo from '../ResumeSelections/ContactInfo';
import EducationInfo from '../ResumeSelections/EducationInfo';
import LanguageSection from '../ResumeSelections/LanguageInfo';
import WorkExperience from '../ResumeSelections/WorkExperience';
import Project from '../ResumeSelections/Project';
import SkillSection from '../ResumeSelections/SkillSection';
import CertificationInfo from '../ResumeSelections/CertificationInfo';

const DEFAULT_THEME = ['#DDF9FB', '#ACF3F8', '#C2FCFF', '#00B8DB', '#000000'];

const SectionTitle = ({ text, color }) => (
  <div className="mb-4">
    <h2 className="text-xl font-bold text-gray-900">
      {text}
    </h2>
  </div>
);

const ContactItem = ({ icon: Icon, text, href, color }) => (
  <div className="flex items-center gap-2 text-sm text-gray-700">
    <Icon size={16} style={{ color }} />
    {href ? (
      <a href={href} className="hover:underline" style={{ color }}>
        {text}
      </a>
    ) : (
      <span>{text}</span>
    )}
  </div>
);

const TemplateTwo = ({ resumeData, colorPaletes, containerWidth }) => {
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
      className="bg-white shadow-lg"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : 'none',
        transformOrigin: 'top left',
        width: containerWidth > 0 ? `${baseWidth}px` : 'auto',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Header Section */}
      <div className="p-8">
        <div className="flex items-start gap-6">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
            {resumeData.profileinfo?.profilePreviewUrl ? (
              <img
                src={resumeData.profileinfo.profilePreviewUrl}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
                <LuUser />
              </div>
            )}
          </div>

          {/* Name and Title */}
          <div className="flex-grow">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {resumeData.profileinfo?.name || 'Your Name'}
            </h1>
            <h2 className="text-xl text-gray-700 mb-4 font-medium">
              {resumeData.profileinfo?.designation || 'Your Title'}
            </h2>

            {/* Contact Information Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {resumeData.contactinfo?.email && (
                <ContactItem
                  icon={LuMail}
                  text={resumeData.contactinfo.email}
                  href={`mailto:${resumeData.contactinfo.email}`}
                  color={themeColors[3]}
                />
              )}
              {resumeData.contactinfo?.phone && (
                <ContactItem
                  icon={LuPhone}
                  text={resumeData.contactinfo.phone}
                  href={`tel:${resumeData.contactinfo.phone}`}
                  color={themeColors[3]}
                />
              )}
              {resumeData.contactinfo?.linkedin && (
                <ContactItem
                  icon={LuLinkedin}
                  text="LinkedIn Profile"
                  href={resumeData.contactinfo.linkedin}
                  color={themeColors[3]}
                />
              )}
              {resumeData.contactinfo?.website && (
                <ContactItem
                  icon={LuGlobe}
                  text="Portfolio Website"
                  href={resumeData.contactinfo.website}
                  color={themeColors[3]}
                />
              )}
              {resumeData.contactinfo?.location && (
                <div className="col-span-2">
                  <ContactItem
                    icon={LuMapPin}
                    text={resumeData.contactinfo.location}
                    color={themeColors[3]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Professional Summary */}
        {resumeData.profileinfo?.summary && (
          <div className="mb-8">
            <SectionTitle text="Professional Summary" color={themeColors[3]} />
            <p className="text-gray-800 leading-relaxed">
              {resumeData.profileinfo.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {(resumeData.workexperience || []).length > 0 && (
          <div className="mb-8">
            <SectionTitle text="Work Experience" color={themeColors[3]} />
            <div className="space-y-6">
              {resumeData.workexperience.map((item, index) => (
                <div key={`work_${index}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.company}</h3>
                      <h4 className="text-md font-medium text-gray-700">{item.role}</h4>
                    </div>
                    <div className="text-sm text-gray-600 font-medium text-right">
                      {formatYearMonth(item.startDate)} – {formatYearMonth(item.endDate)}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {(resumeData.projects || []).length > 0 && (
          <div className="mb-8">
            <SectionTitle text="Projects" color={themeColors[3]} />
            <div className="space-y-6">
              {resumeData.projects.map((item, index) => (
                <div key={`proj_${index}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Project: {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">{item.description}</p>
                  <div className="flex gap-4">
                    {item.github && (
                      <a 
                        href={item.github} 
                        className="flex items-center gap-1 text-sm font-medium hover:underline"
                        style={{ color: themeColors[3] }}
                      >
                        <LuGithub size={14} />
                        GitHub Repository
                      </a>
                    )}
                    {item.livedemo && (
                      <a 
                        href={item.livedemo} 
                        className="flex items-center gap-1 text-sm font-medium hover:underline"
                        style={{ color: themeColors[3] }}
                      >
                        <LuExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(resumeData.skills || []).length > 0 && (
          <div className="mb-8">
            <SectionTitle text="Skills" color={themeColors[3]} />
            <SkillSection
              skills={resumeData.skills}
              accentColor={themeColors[3]}
              bgColor={themeColors[1]}
            />
          </div>
        )}

        {/* Education */}
        {(resumeData.education || []).length > 0 && (
          <div className="mb-8">
            <SectionTitle text="Education" color={themeColors[3]} />
            <div className="space-y-4">
              {resumeData.education.map((data, index) => (
                <div key={`edu_${index}`}>
                  <EducationInfo
                    degree={data.degree}
                    institution={data.institution || data.instituition}
                    duration={`${formatYearMonth(data.startDate)} – ${formatYearMonth(data.endDate)}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {(resumeData.certifications || []).length > 0 && (
          <div className="mb-8">
            <SectionTitle text="Certifications" color={themeColors[3]} />
            <div className="grid grid-cols-2 gap-4">
              {resumeData.certifications.map((cert, index) => (
                <CertificationInfo
                  key={`cert_${index}`}
                  title={cert.title}
                  issuer={cert.issuer}
                  year={cert.year}
                  bgColor={themeColors[1]}
                />
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {(resumeData.languages || []).length > 0 && (
          <div className="mb-8">
            <SectionTitle text="Languages" color={themeColors[3]} />
            <LanguageSection
              languages={resumeData.languages}
              accentColor={themeColors[3]}
              bgColor={themeColors[1]}
            />
          </div>
        )}

        {/* Interests */}
        {/* {(resumeData.interest || []).length > 0 && (
          <div className="mb-8">
            <SectionTitle text="Interests" color={themeColors[3]} />
            <div className="flex flex-wrap gap-3">
              {resumeData.interest.map((item, index) => (
                <span
                  key={`interest_${index}`}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-700"
                  style={{ backgroundColor: themeColors[1] }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TemplateTwo;