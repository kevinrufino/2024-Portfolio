import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toSlug } from '../../utils/helpers.js';

export const ProjectInfo = ({
  technology,
  title,
  description,
  links,
  type,
  year,
  index,
}) => {
  return (
    <div className="md:w-1/3 m-2 md:m-4 my-auto flex flex-col justify-around gap-y-4">
      <div className="flex items-baseline justify-between gap-2">
        <p className="font-offbitDot text-[10px] md:text-xs tracking-[0.25em] uppercase opacity-80">
          {String(index + 1).padStart(2, '0')}
          {type ? ` — ${type}` : ''}
        </p>
        {year && (
          <p className="font-offbitDot text-[10px] md:text-xs tracking-[0.25em] opacity-80">
            {year}
          </p>
        )}
      </div>

      <h1 className="font-offbit101Bold text-4xl md:text-5xl leading-[0.95]">
        {title}
      </h1>

      <div className="flex flex-row flex-wrap gap-2">
        {technology.map(tech => (
          <p
            className="font-offbit101 text-base md:text-lg border-2 border-ultra px-2 pt-1 hover:bg-ultra hover:text-acid transition-colors"
            key={tech}
          >
            {tech}
          </p>
        ))}
      </div>

      <p className="font-offbit text-lg md:text-xl leading-relaxed line-clamp-5">
        {description}
      </p>

      <div className="flex flex-row flex-wrap items-center gap-3">
        <Link
          className="font-offbit101Bold text-base md:text-lg border-2 border-ultra px-3 py-2 shadow-hard-sm hover:shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          to={`/projects/${toSlug(title)}`}
        >
          Open Project File →
        </Link>
        {links.map(link => {
          const key = Object.keys(link)[0];
          return (
            <a
              className="font-offbit101 text-base md:text-lg underline-offset-4 hover:underline decoration-2"
              href={link[key]}
              key={key}
            >
              {key} ↗
            </a>
          );
        })}
      </div>
    </div>
  );
};

ProjectInfo.propTypes = {
  technology: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string,
  year: PropTypes.string,
  index: PropTypes.number.isRequired,
};
