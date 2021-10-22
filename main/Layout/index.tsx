import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import css from '../App.module.css'

export default function Layout ({ children }) {
  const { t } = useTranslation()
  return (
    <>
      <h1>
        React + Express – SSR Starter – TypeScript Edition
      </h1>
      <h2>{t('router-headline')}</h2>
      <ul>
        <li>
          <Link to="/">{t('nav.home')}</Link>
        </li>
        <li>
          <Link to="/page-1">{t('nav.page-1')}</Link>
        </li>
        <li>
          <Link to="/page-2">{t('nav.page-2')}</Link>
        </li>
      </ul>
      
      {children}
    </>
  )
}