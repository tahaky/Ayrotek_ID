import type { RevocationRecord } from '../types'
import type { SerializedError } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import { isCredIssued } from '../../utils/Helpers'

import {
  fetchCredentialsByConId,
  fetchCredentialById,
  issueCredential,
  deleteCredentialById,
} from './credentialsThunks'

interface CredentialState {
  issuedCredentials: string[]
  revokableCredentials: RevocationRecord[]
  isLoading: boolean
  isIssueCredentialLoading: boolean
  error: SerializedError | undefined
}

const initialState: CredentialState = {
  issuedCredentials: [],
  revokableCredentials: [],
  isLoading: true,
  isIssueCredentialLoading: true,
  error: undefined,
}

const credentialSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    clearCredentials: (state) => {
      // state.credentials.map((x) => isCredIssued(x.state) && state.issuedCredentials.push(x))
      // state.credentials = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCredentialsByConId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCredentialsByConId.fulfilled, (state, action) => {
        state.isLoading = false
        const results = action.payload.results
        let revocationObjects: RevocationRecord[] = []
        if (results?.length) {
          results.forEach((cred: any) => {
            if (isCredIssued(cred.state)) {
              const credDefParts = cred.credential_definition_id.split(':')
              const credName = credDefParts[credDefParts.length - 1]
              if (!state.issuedCredentials.includes(credName)) {
                state.issuedCredentials.push(credDefParts[credDefParts.length - 1])
              }
            }
          })
          revocationObjects = results
            .filter(
              (item: any) =>
                item.revoc_reg_id !== undefined &&
                !state.revokableCredentials.map((rev) => rev.revocationRegId).includes(item.revoc_reg_id)
            )
            .map((item: any) => {
              return {
                revocationRegId: item.revoc_reg_id,
                connectionId: item.connection_id,
                credRevocationId: item.revocation_id,
              }
            })
        }
        state.revokableCredentials.push(...revocationObjects)
      })
      .addCase(issueCredential.rejected, (state, action) => {
        state.isIssueCredentialLoading = false
        state.error = action.error
      })
      .addCase(issueCredential.pending, (state) => {
        state.isIssueCredentialLoading = true
      })
      .addCase(issueCredential.fulfilled, (state, action) => {
        state.isIssueCredentialLoading = false
      })
      .addCase(fetchCredentialById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCredentialById.fulfilled, (state, action) => {
        state.isLoading = false
        // const index = state.credentials.findIndex((cred) => cred.id == action.payload.id)

        // if (index == -1) {
        //   state.credentials.push(action.payload)
        //   return state
        // }

        // state.credentials[index] = action.payload
        return state
      })
      .addCase(deleteCredentialById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCredentialById.fulfilled, (state, action) => {
        state.isLoading = false
        // state.credentials.filter((cred) => cred.id !== action.payload)
        return state
      })
      .addCase('clearUseCase', (state) => {
        // state.credentials.map((x) => isCredIssued(x.state) && state.issuedCredentials.push(x))
        // state.credentials = []
        state.isLoading = false
      })
  },
})

export const { clearCredentials } = credentialSlice.actions

export default credentialSlice.reducer
