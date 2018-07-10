import React from 'react'
import styled from 'styled-components'
import { FormSwitcher } from '@artsy/reaction/dist/Components/Authentication/FormSwitcher'
import {
  ModalType,
  ModalOptions,
} from '@artsy/reaction/dist/Components/Authentication/Types'
import { ModalHeader } from '@artsy/reaction/dist/Components/Modal/ModalHeader'
import { handleSubmit } from '../helpers'

interface Props {
  type: string
  meta: {
    title?: string
  }
  options: ModalOptions
}

export class AuthStatic extends React.Component<Props> {
  render() {
    const { type, options, meta: { title } } = this.props
    return (
      <Wrapper>
        <AuthFormContainer>
          <ModalHeader title={title} hasLogo />
          <FormSwitcher
            {...this.props}
            type={type as ModalType}
            isStatic
            handleSubmit={handleSubmit.bind(this, type, options)}
          />
        </AuthFormContainer>
      </Wrapper>
    )
  }
}

const AuthFormContainer = styled.div`
  max-width: 400px;
  padding: 20px 0;
`

const Wrapper = styled.div`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`