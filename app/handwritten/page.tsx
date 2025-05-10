
import React from 'react'
import { THEMES } from '@/assets/theme'
import { complexMathLinearAlgebraContent } from '@/assets/structuredText'
import BluePastelCanvas from '@/components/BlueLayoutCanvas'

const page = () => {
  return (
    <>
    <BluePastelCanvas theme={THEMES[0]} content={complexMathLinearAlgebraContent} />
    </>
  )
}

export default page