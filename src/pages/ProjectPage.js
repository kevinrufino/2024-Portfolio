import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ProjectsData } from '../constants.js';
import { NavBar } from '../components/Nav.js';
import Cursor from '../components/Cursor.js';
import { useCursor } from '../context/CursorContext.js';
import { toSlug } from '../utils/helpers.js';

const Label = ({ children }) => (
  <span className="font-offbitDot text-[10px] md:text-xs tracking-[0.25em] uppercase opacity-80">
    {children}
  </span>
);

Label.propTypes = {
  children: PropTypes.node.isRequired,
};

const Marquee = ({ text }) => {
  const chunk = Array(6).fill(`${text} ✦ `).join('');
  return (
    <div className="overflow-hidden whitespace-nowrap border-2 border-ultra bg-ultra text-acid">
      <div className="marquee-track inline-block py-2 font-offbit101Bold text-xl md:text-2xl">
        <span>{chunk}</span>
        <span>{chunk}</span>
      </div>
    </div>
  );
};

Marquee.propTypes = {
  text: PropTypes.string.isRequired,
};

const ProjectPage = () => {
  const { slug } = useParams();
  const { setCursorType, type: cursorType } = useCursor();
  const prefersReducedMotion = useReducedMotion();

  const index = ProjectsData.findIndex(p => toSlug(p.title) === slug);
  const project = index !== -1 ? ProjectsData[index] : null;
  const prev =
    ProjectsData[(index - 1 + ProjectsData.length) % ProjectsData.length];
  const next = ProjectsData[(index + 1) % ProjectsData.length];
  const fileNo = String(index + 1).padStart(2, '0');

  useEffect(() => {
    setCursorType('');
    window.scrollTo(0, 0);
  }, [slug, setCursorType]);

  useEffect(() => {
    if (project) document.title = `${project.title} — Kevin Rufino`;
    return () => {
      document.title = 'Kevin Rufino';
    };
  }, [project]);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.07 },
    },
  };

  const cell = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-acid text-ultra grain">
        <Cursor cursor={cursorType} />
        <NavBar setCursor={setCursorType} />
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-6">
          <p className="font-offbitDot text-sm tracking-[0.3em]">ERROR 404</p>
          <h1 className="font-offbit101Bold text-5xl md:text-7xl text-center">
            Project not found
          </h1>
          <Link
            to="/"
            className="cell-hard font-offbit101Bold text-xl px-6 py-3 bg-acid"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-acid text-ultra grain">
      <Cursor cursor={cursorType} />
      <NavBar setCursor={setCursorType} />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-48 lg:pt-56 pb-16">
        {/* Dossier header */}
        <div className="flex items-end justify-between gap-4 mb-4 md:mb-6">
          <Link
            to="/#projects"
            className="font-offbit101Bold text-lg md:text-xl border-b-2 border-ultra hover:bg-ultra hover:text-acid transition-colors px-1"
          >
            ← INDEX
          </Link>
          <p className="font-offbitDot text-xs md:text-sm tracking-[0.3em] text-right">
            PROJECT FILE {fileNo}/{String(ProjectsData.length).padStart(2, '0')}
            <span className="blink">_</span>
          </p>
        </div>

        {/* Bento hero */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4"
        >
          {/* Title cell */}
          <motion.div
            variants={cell}
            className="cell-hard col-span-2 lg:col-span-5 bg-acid p-5 md:p-8 flex flex-col justify-between gap-6 min-h-[260px]"
          >
            <div className="flex items-start justify-between">
              <Label>{project.client}</Label>
              <span className="font-plumpelo text-5xl md:text-6xl leading-none opacity-20">
                {fileNo}
              </span>
            </div>
            <h1 className="font-offbit101Bold text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.95] break-words">
              {project.title}
            </h1>
            <Label>{project.type}</Label>
          </motion.div>

          {/* Media cell */}
          <motion.div
            variants={cell}
            className="cell-hard relative col-span-2 lg:col-span-7 bg-ultra overflow-hidden"
          >
            <video
              className="w-full h-full object-cover aspect-video"
              src={`/${project.scrapeGif}`}
              autoPlay
              loop
              muted
              playsInline
            />
            <p className="absolute top-3 left-3 font-offbitDot text-[10px] md:text-xs tracking-[0.25em] bg-acid text-ultra px-2 py-1 border-2 border-ultra">
              ● LIVE CAPTURE
            </p>
          </motion.div>

          {/* Meta cells */}
          <motion.div
            variants={cell}
            className="cell-hard col-span-1 lg:col-span-2 bg-acid p-4 md:p-5 flex flex-col justify-between gap-2 min-h-[100px]"
          >
            <Label>Year</Label>
            <p className="font-offbit101Bold text-3xl md:text-4xl">
              {project.year}
            </p>
          </motion.div>
          <motion.div
            variants={cell}
            className="cell-hard col-span-1 lg:col-span-3 bg-acid p-4 md:p-5 flex flex-col justify-between gap-2 min-h-[100px]"
          >
            <Label>Role</Label>
            <p className="font-offbit101Bold text-2xl md:text-3xl">
              {project.role}
            </p>
          </motion.div>

          {/* Live preview link cell — if available */}
          {project.liveLink && (
            <motion.div
              variants={cell}
              className="cell-hard col-span-2 lg:col-span-12 bg-ultra text-acid p-5 md:p-8 flex items-center justify-center"
            >
              <Link
                to={`/projects/${slug}/preview`}
                className="font-offbit101Bold text-2xl md:text-4xl border-2 border-acid px-6 py-4 shadow-hard-sm hover:shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all bg-acid text-ultra"
              >
                ▶ Open Live Preview
              </Link>
            </motion.div>
          )}

          {/* Description cell — inverted */}
          <motion.div
            variants={cell}
            className="cell-hard col-span-2 lg:col-span-7 lg:row-span-2 bg-ultra text-acid p-5 md:p-8 flex flex-col gap-4"
          >
            <Label>Briefing</Label>
            <p className="font-offbit text-lg md:text-xl leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Stack cell */}
          <motion.div
            variants={cell}
            className="cell-hard col-span-2 lg:col-span-5 bg-acid p-5 md:p-6 flex flex-col gap-3"
          >
            <Label>Stack</Label>
            <div className="flex flex-wrap gap-2">
              {project.technology.map(tech => (
                <span
                  key={tech}
                  className="font-offbit101 text-base md:text-lg border-2 border-ultra px-2 pt-1 hover:bg-ultra hover:text-acid transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Links cell */}
          <motion.div
            variants={cell}
            className="cell-hard col-span-2 lg:col-span-5 bg-acid p-5 md:p-6 flex flex-col gap-3"
          >
            <Label>Transmissions</Label>
            <div className="flex flex-wrap gap-3">
              {project.links.map(link => {
                const key = Object.keys(link)[0];
                return (
                  <a
                    key={key}
                    href={link[key]}
                    target="_blank"
                    rel="noreferrer"
                    className="font-offbit101Bold text-base md:text-lg border-2 border-ultra px-3 py-2 shadow-hard-sm hover:shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all bg-acid"
                  >
                    {key} ↗
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Asset cells — pixel artifacts from the project */}
          {project.assets && project.assets.length > 0 ? (
            project.assets.map((asset, i) => (
              <motion.div
                key={asset}
                variants={cell}
                className="cell-hard relative col-span-1 lg:col-span-3 bg-acid overflow-hidden flex items-center justify-center aspect-square"
              >
                <img
                  src={asset}
                  alt={`${project.title} artifact ${i + 1}`}
                  className="max-w-[70%] max-h-[70%] object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
                <p className="absolute bottom-2 left-2 font-offbitDot text-[10px] tracking-[0.25em]">
                  ARTIFACT_{String(i + 1).padStart(2, '0')}
                </p>
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={cell}
              className="cell-hard col-span-1 lg:col-span-3 pixel-checker opacity-60 aspect-square"
              aria-hidden="true"
            />
          )}

          {/* Decorative filler keeps the grid dense */}
          <motion.div
            variants={cell}
            className="cell-hard col-span-1 lg:col-span-2 bg-ultra text-acid p-4 flex flex-col items-center justify-center gap-1 aspect-square"
          >
            <span className="font-plumpelo text-4xl md:text-5xl leading-none">
              KR
            </span>
            <Label>EST. 1997</Label>
          </motion.div>

          <motion.div variants={cell} className="col-span-2 lg:col-span-12">
            <Marquee
              text={`${project.title} — ${project.type} — ${project.year}`}
            />
          </motion.div>
        </motion.div>

        {/* Prev / Next dossier navigation */}
        <nav className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
          <Link
            to={`/projects/${toSlug(prev.title)}`}
            className="cell-hard bg-acid p-5 md:p-6 flex flex-col gap-2 group"
          >
            <Label>← Previous file</Label>
            <p className="font-offbit101Bold text-2xl md:text-4xl type-outline group-hover:[-webkit-text-fill-color:var(--ultra)] break-words">
              {prev.title}
            </p>
          </Link>
          <Link
            to={`/projects/${toSlug(next.title)}`}
            className="cell-hard bg-acid p-5 md:p-6 flex flex-col gap-2 items-end text-right group"
          >
            <Label>Next file →</Label>
            <p className="font-offbit101Bold text-2xl md:text-4xl type-outline group-hover:[-webkit-text-fill-color:var(--ultra)] break-words">
              {next.title}
            </p>
          </Link>
        </nav>

        <p className="font-offbitDot text-center text-xs tracking-[0.3em] mt-10 opacity-70">
          * KEVIN RUFINO — PROJECT ARCHIVE *
        </p>
      </main>
    </div>
  );
};

export default ProjectPage;
