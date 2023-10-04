import type { CustomCharacter } from '../src/content/types'

import { getDateInt } from '../src/utils/dateint'
export const studentCustom: CustomCharacter = {
  name: 'Ece',
  type: 'Customer',
  image: '/public/student/student.svg',
  revocationInfo: [
    {
      credentialName: 'Insurance Card',
      credentialIcon: '/public/student/icon-student.svg',
      title: 'Revoke your Insurance Card',
      description:
        'Best Ayrotek College allows you to revoke your Insurance Card "if":\n• there is a problem with your credential.\n• your device was lost or stolen and you want to secure your personal information.',
    },
  ],
  progressBar: [
    {
      name: 'person',
      onboardingStep: 'PICK_CHARACTER',
      iconLight: '/public/common/icon-person-light.svg',
      iconDark: '/public/common/icon-person-dark.svg',
    },
    {
      name: 'moon',
      onboardingStep: 'SETUP_START',
      iconLight: '/public/common/icon-moon-light.svg',
      iconDark: '/public/common/icon-moon-dark.svg',
    },
    {
      name: 'wallet',
      onboardingStep: 'CHOOSE_WALLET',
      iconLight: '/public/common/icon-wallet-light.svg',
      iconDark: '/public/common/icon-wallet-dark.svg',
    },
    {
      name: 'notification',
      onboardingStep: 'ACCEPT_CREDENTIAL',
      iconLight: '/public/common/icon-notification-light.svg',
      iconDark: '/public/common/icon-notification-dark.svg',
    },
    {
      name: 'balloon',
      onboardingStep: 'SETUP_COMPLETED',
      iconLight: '/public/common/icon-balloon-light.svg',
      iconDark: '/public/common/icon-balloon-dark.svg',
    },
  ],
  onboarding: [
    {
      screenId: 'PICK_CHARACTER',
      title: 'Meet Ece',
      text: 'Meet Ece, Ece is a customer who wants to learn about her credit risk score. In order to make life easier for its customers, Ayrotek Insurance Platform will give Ece a digital Credit Risk Score that she can put in her AyroID Wallet.',
    },
    {
      screenId: 'SETUP_START',
      title: "Let's get started!",
      text: 'AyroID is a new app for storing and using credentials on your smartphone. Credentials are things like IDs, licenses and diplomas. \nUsing your AyroID is fast and simple. In the future it can be used online and in person. You approve every use, and share only what is needed. \nIn this demo, you will use two credentials to prove who you are and access court materials online instead of in-person.',
      image: '/public/common/getStarted.svg',
    },
    {
      screenId: 'CONNECT',
      title: 'Connect with Ayrotek Insurance Platform',
      text: 'Imagine, as Ece, you are logged into the Ayrotek Insurance Platform website (see below). They want to offer you a Credit Risk Score. Use your AyroID to scan the QR code from the website. As Ece, you are logged into the Ayrotek College website (see below). They want to offer you a Digital Insurance Card. Use your AyroID to scan the QR code from the website.',
      image: '/public/student/onboarding-connect-light.svg',
      issuer_name: 'Ayrotek College',
    },
    {
      screenId: 'ACCEPT_CREDENTIAL',
      title: 'Accept Your Credit Risk Score',
      text: "Your wallet now has a secure and private connection with Ayrotek Insurance Platform. You should have received an offer in AyroID for a Credit risk score.\nReview what they are sending, and choose 'Accept offer'.",
      image: '/public/common/onboarding-credential-light.svg',
      credentials: [
        {
          name: 'credit_risk_score',
          version: '1.0',
          icon: '/public/student/icon-student.svg',
          attributes: [
            {
              name: 'TCKN',
              value: '28302123744',
            },
            {
              name: 'Name',
              value: 'Ece',
            },
            {
              name: 'Surname',
              value: 'Mertoğlu',
            },
            {
              name: 'Report Date',
              value: '03.10.2023',
            },
            {
              name: 'Reference Cod',
              value: '8080KN5L845',
            },
            {
              name: 'Credit Score',
              value: '1325',
            },
            {
              name: 'Total Limit',
              value: '500.000 TL',
            },
            {
              name: 'Total Debts',
              value: '124.562 TL',
            },
            {
              name: 'Number of Credits in Collection',
              value: '1',
            },
            {
              name: 'Total Balance of Credits in Collection',
              value: '15.564 TL',
            },
            {
              name: 'Last Collection Date',
              value: '01.10.2023',
            },
          ],
        },
      ],
    },
    {
      screenId: 'SETUP_COMPLETED',
      title: "You're all set!",
      text: 'Congratulations, you’ve just received your first digital credentials. They are safely stored in your wallet and ready to be used. So, what are you waiting for? Let’s go!',
      image: '/public/common/onboarding-completed-light.svg',
    },
  ],
  useCases: [
    {
      id: 'tenant check',
      name: 'Tenant Risk Score Check',
      screens: [
        {
          screenId: 'START',
          title: 'Getting a Risk Score Check',
          text: 'Ece can get a Checking Risk score on her credential. In this example, Ece will just proof her risk score is greater than or equal to required for renting the house .',
          image: '/public/student/useCases/store/card-school.svg',
        },
        {
          screenId: 'CONNECTION',
          title: "Start proving you're a insurance",
          text: 'Imagine, as Ece, her in the Risk Score Check process for renting a house. They will rent out the house if her risk score is greater than or equal to required for renting the house. First, scan the QR code.',
          image: '/public/student/useCases/store/cool-clothes-no-overlay.png',
          verifier: { name: 'Cool Clothes Online', icon: '/public/student/useCases/store/logo-university.png' },
        },
        {
          screenId: 'PROOF',
          title: 'Confirm the information to send',
          text: "AyroID will now ask you to confirm what to send. Notice how it will only share if the credential has expired, not even the expiry date itself gets shared. You don't have to share anything else for it to be trustable.",
          requestOptions: {
            title: 'Tenant Risk Score Check Request',
            text: 'Tenant Risk Score Check would like some of your personal information.',
            requestedCredentials: [
              {
                icon: '/public/student/useCases/school/icon-university-card.png',
                name: 'credit_risk_score',
                predicates: {
                  name: 'Credit Score',
                  type: '>=',
                  value: 1000,
                },
              },
            ],
          },
        },
        {
          screenId: 'STEP_END',
          title: "You're done!",
          text: 'You proved that your risk skore is enough for renting the house, and you can rent the house. It only took a few seconds, you revealed minimal information, and Tenant Risk Score Check easily and automatically trust what you sent.',
          image: '/public/student/student-accepted.svg',
        },
      ],
    },
    {
      id: 'takingLoan',
      name: 'Trust Bank',
      screens: [
        {
          screenId: 'START',
          title: 'Taking a loan from the bank',
          text: "Ece (that's you in this demo!) wants to get a loan from the bank to buy a new house. In this example, you will tell Trust Bank your credit risk score information.",
          image: '/public/student/useCases/store/card-school.svg',
        },
        {
          screenId: 'CONNECTION',
          title: 'Start proving your credit risk score',
          text: 'Imagine going to Trust Bank as Ece. If you can prove your credit risk score, you can get a loan at affordable rates for your new home. First, scan the QR code.',
          image: '/public/student/useCases/store/cool-clothes-no-overlay.png',
          verifier: { name: 'Cool Clothes Online', icon: '/public/student/useCases/store/logo-university.png' },
        },
        {
          screenId: 'PROOF',
          title: 'Confirm the information to send',
          text: "AyroID will now ask you to confirm what to send. Notice how it will only share if the credential has expired, not even the expiry date itself gets shared. You don't have to share anything else for it to be trustable.",
          requestOptions: {
            title: 'Trust Bank Request',
            text: 'Trust Bank would like some of your personal information.',
            requestedCredentials: [
              {
                icon: '/public/student/useCases/school/icon-university-card.png',
                name: 'credit_risk_score',
                properties: ['TCKN', 'Name', 'Surname', 'Report Date', 'Reference Code', 'Credit Score', 'Total Limit'],
              },
            ],
          },
        },
        {
          screenId: 'STEP_END',
          title: "You're done!",
          text: 'You proved your credit risk score and Trus Bank gave you a loan. It only took a few seconds, you revealed very little information, and Trust Bank was able to easily and automatically trust what you sent.',
          image: '/public/student/student-accepted.svg',
        },
      ],
    },
  ],
}
