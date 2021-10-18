import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setLocale, counterIncrement } from '../../store/app/actions'
import { getCounter } from '../../store/app/selectors'
import { Locale } from '../../store/app/types'
import Features from '../../components/Features'

const App: React.FC<any> = () => {
  const { t } = useTranslation()
  const counter = useSelector(getCounter)
  const dispatch = useDispatch()
  const handleLocaleChange = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      dispatch(setLocale(e.currentTarget.value as Locale))
    },
    [dispatch]
  )

  const handleCount = () => {
    dispatch(counterIncrement())
  }

  return (
    <React.Fragment>
      <Features />
      <h1>{counter}</h1>
      <h2>{t('i18n-example')}</h2>
      <p>
        <button value="de_DE" onClick={handleLocaleChange}>
          Deutsch
        </button>
        <button value="en_US" onClick={handleLocaleChange}>
          English
        </button>
        <button value="en_US" onClick={handleCount}>
          test
        </button>
      </p>
    </React.Fragment>
  )
}

export default App
