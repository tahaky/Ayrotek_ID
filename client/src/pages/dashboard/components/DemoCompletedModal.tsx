import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { standardFade, dropIn } from '../../../FramerAnimations'
import { Button } from '../../../components/Button'
import { SmallButton } from '../../../components/SmallButton'
import { SmallButtonText } from '../../../components/SmallButtonText'
export interface Props {
  action(): void
  cancel?(): void
}

export const DemoCompletedModal: React.FC<Props> = ({ action, cancel }) => {
  const navigate = useNavigate()

  const TITLE = 'AyroID Showcase Completed!'
  const DESCRIPTION = 'Looking to leave some feedback? Take our survey and connect with us!'

  return (
    <AnimatePresence>
      <motion.div
        variants={standardFade}
        initial="hidden"
        animate="show"
        exit="exit"
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-bcgov-black bg-opacity-50 transition-opacity" aria-hidden="true" />
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" />
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="show"
            exit="exit"
            className="bg-bcgov-white dark:bg-bcgov-black inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:text-white"
          >
            <div className=" px-4 pt-2 mt-4 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h2 className="text-xl font-medium text-grey-900">{TITLE}</h2>
                  <div className="mt-2 text-sm"></div>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4 sm:px-6 sm:flex sm:flex-row-reverse">
              <SmallButton onClick={action} text={'FINISH'} disabled={false} />
              {cancel && <SmallButtonText onClick={cancel} text={'CANCEL'} disabled={false} />}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
