import React from 'react'
import { Table, Spin, Card, Input } from 'antd'
import { connect } from 'react-redux'

import AdminListActions from './components/AdminListActions'
import { fetchUsers } from '../../../modules/admin'

class AdminValid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }

    this.props.fetchUsers()
  }

  render() {
    let { users } = this.props
    if (!users) {
      return <Spin />
    }
    users = users.filter(user => {
      return (
        user.full_name
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      )
    })
    // Apply filters
    let rows = users.map(user => {
      return { ...user, id2: user.id }
    })
    // Apply column filters
    let columns = [
      {
        title: 'Utilisateur',
        dataIndex: 'full_name'
      },
      {
        title: 'Permissions',
        dataIndex: 'Permissions'
      },
      {
        title: 'Actions',
        dataIndex: 'id',
        render: id => <AdminListActions userId={id} />,
      }
    ]
    return (
      <React.Fragment>
        <Card title='Filtrer'>
          <Input
            value={this.state.search}
            onChange={e => this.setState({ search: e.target.value })}
            placeholder='Rechercher un utilisateur par nom / prénom'
          />
        </Card>
        <Table
          columns={columns}
          dataSource={rows}
          rowKey='id'
          locale={{ emptyText: 'Aucun utilisateur' }}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  users: state.admin.users
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminValid)
