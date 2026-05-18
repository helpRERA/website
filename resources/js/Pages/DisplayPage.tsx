import React, { lazy, useEffect, useMemo, useState } from 'react'

const importView = (subreddit: string) => {
  return lazy(() => import(`./${subreddit}`))
}

const subredditsToShow = ['DeregistedProjects']

const DisplayPage = () => {
  const [views, setViews] = useState<JSX.Element[]>([])

  const RenderView = useMemo(async () => {
    return await importView('DeregisteredProjects')
  }, [])

  useEffect(() => {
    async function loadViews() {
      const componentPromises = subredditsToShow.map(async (subreddit: string, index: number) => {
        const View = await importView(subreddit)
        return <View key={index.toString()} />
      })
      Promise.all(componentPromises).then(setViews)
    }

    loadViews()
  }, [subredditsToShow])

  return <div>{views}</div>
}

export default DisplayPage
