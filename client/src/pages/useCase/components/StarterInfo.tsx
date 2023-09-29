import type { CredentialRequest } from '../../../slices/types'

import { motion } from 'framer-motion'
import React from 'react'

import { ActionCard } from './ActionCard'

export interface Props {
  title: string
  description: string
  entity: { name: string; icon?: string }
  requestedCredentials?: CredentialRequest[]
}

export const StarterInfo: React.FC<Props> = ({ title, description, entity, requestedCredentials }) => {
  return (
    <motion.div className="flex flex-col h-full">
      <h1 className="text-4xl	font-bold my-4">{title}</h1>
      <p className="leading-loose">{description}</p>
      <div className="flex flex-col items-center justify-center h-full">
        {entity && <ActionCard title={"You're connecting with"} items={[entity]} />}
        {requestedCredentials && (
          <ActionCard
            title={"You'll need to present"}
            items={requestedCredentials.map((item) => {
              return { name: item.name, icon: item.icon }
            })}
          />
        )}
        {/* {issueCredentials && <ActionCard title={"You'll receive"} items={issueCredentials} />} */}
      </div>
    </motion.div>
  )
}
