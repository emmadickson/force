import { ContextModule } from "@artsy/cohesion"
import { ArtistRow_artist } from "v2/__generated__/ArtistRow_artist.graphql"
import { Mediator } from "v2/Artsy"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import FillwidthItem from "../Artwork/FillwidthItem"
import Follow from "../Follow"
import Text from "../Text"
import TextLink from "../TextLink"
import { Carousel } from "../Carousel"
import styled from "styled-components"

const HEIGHT = 160

interface Props extends React.HTMLProps<ArtistRow> {
  artist: ArtistRow_artist
  mediator: Mediator
}

export class ArtistRow extends React.Component<Props, null> {
  render() {
    const { artist, mediator } = this.props
    return (
      <Container>
        <Header>
          <TextLink href={artist.href}>
            <Text textSize="small" textStyle="primary">
              {artist.name}
            </Text>
          </TextLink>
          <Follow
            artist={artist}
            contextModule={ContextModule.featuredArtistsRail}
          />
        </Header>

        <Carousel arrowHeight={HEIGHT}>
          {artist.artworks.edges.map(({ node }) => {
            return (
              <FillwidthItem
                key={node.id}
                artwork={node}
                imageHeight={HEIGHT}
                contextModule={ContextModule.featuredArtistsRail}
                mediator={mediator}
              />
            )
          })}
        </Carousel>
      </Container>
    )
  }
}

const Header = styled.div`
  display: flex;
  margin-bottom: 20px;
`

const Container = styled.div`
  margin-bottom: 60px;
`

export default createFragmentContainer(ArtistRow, {
  artist: graphql`
    fragment ArtistRow_artist on Artist {
      name
      href
      ...Follow_artist
      artworks: artworksConnection(first: 6) {
        edges {
          node {
            id
            ...FillwidthItem_artwork
          }
        }
      }
    }
  `,
})
