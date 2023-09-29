import type { ProofRequestData } from '../slices/types'
import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export const createProofRequest = (data: ProofRequestData): Promise<AxiosResponse> => {
  const proofRequest = {
    requested_attributes: Object.assign({}, data.attributes),
    requested_predicates: Object.assign({}, data.predicates),
    non_revoked: { to: Math.floor(new Date().valueOf() / 1000) },
    version: '1.0.0',
    name: data.requestOptions?.name,
  }

  return apiCall.post(`/demo/proofs/requestProof`, {
    connection_id: data.connectionId,
    comment: data.requestOptions?.comment,
    proof_request: proofRequest,
    auto_verify: true,
  })
}

export const createDeepProofRequest = (data: ProofRequestData): Promise<AxiosResponse> => {
  const proofRequest = {
    requested_attributes: Object.assign({}, data.attributes),
    requested_predicates: Object.assign({}, data.predicates),
    non_revoked: { to: Math.floor(new Date().valueOf() / 1000) },
    version: '1.0.0',
    name: data.requestOptions?.name,
  }

  return apiCall.post(`/demo/deeplink/requestProof`, {
    connection_id: data.connectionId,
    proof_request: proofRequest,
    comment: data.requestOptions?.comment ?? '',
    auto_verify: true,
  })
}

export const createOOBProofRequest = (data: ProofRequestData): Promise<AxiosResponse> => {
  const proofRequest = {
    requested_attributes: Object.assign({}, data.attributes),
    requested_predicates: Object.assign({}, data.predicates),
    version: '1.0.0',
    name: data.requestOptions?.name,
    auto_verify: true,
    auto_present: true,
  }

  return apiCall.post(`/demo/proofs/requestProofOOB`, {
    proof_request: proofRequest,
    comment: data.requestOptions?.comment,
  })
}

export const getProofById = (proofId: string): Promise<AxiosResponse> => {
  return apiCall.get(`/demo/proofs/${proofId}`)
}

export const deleteProofById = (proofId: string): Promise<AxiosResponse> => {
  return apiCall.delete(`/demo/proofs/${proofId}`)
}
