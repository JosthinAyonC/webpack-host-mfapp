import { faBars, faChevronDown, faChevronRight, faHome, faMapMarkerAlt, faUserCheck, faUserTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Route {
  path?: string; // `path` será opcional para las rutas padres
  label: string;
  icon: React.ReactNode;
  children?: Route[];
}

export const Sidebar: React.FC<{ className?: string; isMobile?: boolean }> = ({ className, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([]);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleRouteClick = (path?: string) => {
    if (isMobile && path) setIsOpen(false); // Cierra el sidebar en móvil solo si tiene una ruta
  };

  const toggleRouteExpansion = (path: string) => {
    setIsOpen(true);
    setExpandedRoutes((prev) => (prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]));
  };

  const routes: Route[] = [
    { path: '/home', label: 'Home', icon: <FontAwesomeIcon icon={faHome} /> },
    {
      label: 'Clientes',
      icon: <FontAwesomeIcon icon={faUsers} />,
      children: [
        {
          path: '/clientes/activos',
          label: 'Clientes Activos',
          icon: <FontAwesomeIcon icon={faUserCheck} />,
        },
        {
          label: 'Clientes Inactivos',
          icon: <FontAwesomeIcon icon={faUserTimes} />,
          children: [
            {
              path: '/clientes/inactivos/norte',
              label: 'Zona Norte',
              icon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
            },
            {
              path: '/clientes/inactivos/sur',
              label: 'Zona Sur',
              icon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
            },
          ],
        },
      ],
    },
  ];

  const renderRoutes = (routes: Route[], level = 0) =>
    routes.map((route) => {
      const hasChildren = route.children && route.children.length > 0;
      const isExpanded = expandedRoutes.includes(route.label);
      const isActive = route.path ? location.pathname.startsWith(route.path) : false;

      return (
        <li key={route.label} className="mb-2 relative group overflow-visible">
          <div
            className={`flex items-center justify-between p-2 cursor-pointer rounded hover:bg-[var(--hover)] ${isActive ? 'bg-[var(--highlight)]' : ''}`}
            onClick={() => (hasChildren ? toggleRouteExpansion(route.label) : handleRouteClick(route.path))}
          >
            {route.path ? (
              <Link to={route.path} className="flex items-center gap-2 text-[var(--font)]">
                {route.icon}
                {isOpen && <span>{route.label}</span>}
              </Link>
            ) : (
              <div className="flex items-center gap-2 text-[var(--font)]">
                {route.icon}
                {isOpen && <span>{route.label}</span>}
              </div>
            )}
            {hasChildren && isOpen && <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronRight} />}
          </div>
          {hasChildren && (
            <AnimatePresence>
              {isExpanded && isOpen && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="pl-4 overflow-hidden"
                >
                  {route.children && renderRoutes(route.children, level + 1)}
                </motion.ul>
              )}
            </AnimatePresence>
          )}
        </li>
      );
    });

  return (
    <>
      {/* Botón flotante en móvil */}
      {isMobile && (
        <button onClick={toggleSidebar} className="fixed bottom-4 left-4 z-50 bg-[var(--primary)] text-[var(--font)] px-3 py-2 rounded-xl shadow-lg">
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}

      {/* Fondo opaco al abrir el sidebar en móvil */}
      {isMobile && isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <motion.aside
        initial={{
          x: isMobile ? '-100%' : 0,
          width: isMobile ? '80%' : isOpen ? 250 : 64,
        }}
        animate={{
          x: isMobile && isOpen ? 0 : isMobile ? '-100%' : 0,
          width: isMobile ? '80%' : isOpen ? 250 : 64,
        }}
        transition={{ duration: 0.2 }}
        className={`fixed top-0 ${isMobile ? 'h-screen' : 'h-full'} bg-[var(--primary)] text-[var(--font)] z-50 flex flex-col p-4 overflow-hidden ${className}`}
      >
        {/* Título y botón para colapsar (solo desktop) */}
        {!isMobile && (
          <div className="flex justify-between items-center mb-4">
            {isOpen && <h1 className="text-xl font-bold">SASF PROYECTO BASE</h1>}
            <button onClick={toggleSidebar} className="text-[var(--font)] p-2">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        )}
        <nav>
          <ul>{renderRoutes(routes)}</ul>
        </nav>
      </motion.aside>
    </>
  );
};
