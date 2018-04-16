// @flow
import React from 'react'
import { wallet } from 'neon-js'
import { trim, toLower, isEmpty } from 'lodash'

import { ROUTES } from '../../core/constants'
import styles from './EditContact.scss'

type Props = {
  history: Object,
  name: string,
  address: string,
  newName: string,
  newAddress: string,
  save: Function
}

export default class EditContact extends React.Component<Props> {
  componentWillMount = () => {
    if (!this.props.address) {
      this.props.history.push(ROUTES.CONTACTS)
    }
  }

  render () {
    return (
      <div className={styles.editContact}>
        {this.props.name} / {this.props.address}
      </div>
    )
  }

  handleSave = () => {
    const oldName = trim(this.props.name)
    const newName = trim(this.props.newName)
    const oldAddress = toLower(trim(this.props.address))
    const newAddress = toLower(trim(this.props.newAddress))

    if (isEmpty(newName)) {
      return window.alert('Name cannot be empty')
    }

    if (isEmpty(newAddress)) {
      return window.alert('Address cannot be empty')
    }

    if (!wallet.isAddress(newAddress)) {
      return window.alert('Invalid address')
    }

    if (oldName !== newName || oldAddress !== newAddress) {
      this.props.save(oldName, newName, newAddress)
    }

    return this.props.history.push(ROUTES.CONTACTS)
  }
}
