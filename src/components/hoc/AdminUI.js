import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { isAdmin, isFirst } from '~/utils'
import { pageNext, pagePrev } from '~/actions'
import RerenderBlocker from '~/components/misc/RerenderBlocker'
import ReloadButton from '~/components/ui/ReloadButton'

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 3%;
  width: 100%;
  height: 18%;
`

const Button = styled.a`
  width: 5vw;
  height: 5vw;
  position: absolute;
  text-align: center;
  font-size: 3.5vw;
  border-radius: 100%;
  background-color: rgba(16, 255, 0, 0.42);
  box-shadow: 0 0 14px 10px #0c3f02;
  color: white;
  &:active {
    background-color: rgba(16, 255, 0, 0.92);
  }
  &:hover {
    background-color: rgba(16, 255, 0, 0.92);
  }
  &:focus {
    outline: none;
  }
`

const Left = styled(Button)`
  left: 5%;
`
const Right = styled(Button)`
  right: 5%;
`

const Icon = styled.span`
  margin-top: 12.3%;
`

const mapToStateProps = state => ({ currentPage: state.currentPage })

const AdminUIGenerator = Component => ({ location, currentPage, ...props }) => {
  return isAdmin(location.search) ? (
    <div>
      <RerenderBlocker>
        <Component />
      </RerenderBlocker>
      <ButtonGroup>
        {isFirst() ? null : (
          <Left onClick={props.pagePrev}>
            <Icon className="fa fa-angle-left" />
          </Left>
        )}
        <Right onClick={props.pageNext}>
          <Icon className="fa fa-angle-right" />
        </Right>
      </ButtonGroup>
    </div>
  ) : (
    <RerenderBlocker>
      <ReloadButton />
      <Component />
    </RerenderBlocker>
  )
}

export default Component =>
  connect(mapToStateProps, { pageNext, pagePrev })(AdminUIGenerator(Component))