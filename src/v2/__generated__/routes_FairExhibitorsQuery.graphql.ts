/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_FairExhibitorsQueryVariables = {
    slug: string;
};
export type routes_FairExhibitorsQueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairExhibitors_fair">;
    } | null;
};
export type routes_FairExhibitorsQuery = {
    readonly response: routes_FairExhibitorsQueryResponse;
    readonly variables: routes_FairExhibitorsQueryVariables;
};



/*
query routes_FairExhibitorsQuery(
  $slug: String!
) {
  fair(id: $slug) {
    ...FairExhibitors_fair
    id
  }
}

fragment FairExhibitorRail_show on Show {
  internalID
  href
  partner {
    __typename
    ... on Partner {
      name
    }
    ... on ExternalPartner {
      name
      id
    }
    ... on Node {
      id
    }
  }
  counts {
    artworks
  }
}

fragment FairExhibitors_fair on Fair {
  id
  exhibitors: showsConnection(first: 30, sort: FEATURED_ASC) {
    edges {
      show: node {
        id
        counts {
          artworks
        }
        ...FairExhibitorRail_show
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "routes_FairExhibitorsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairExhibitors_fair"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "routes_FairExhibitorsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": "exhibitors",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 30
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "FEATURED_ASC"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ShowEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": "show",
                    "args": null,
                    "concreteType": "Show",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ShowCounts",
                        "kind": "LinkedField",
                        "name": "counts",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artworks",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "href",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
                            "storageKey": null
                          },
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v3/*: any*/),
                            "type": "Partner"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v3/*: any*/),
                            "type": "ExternalPartner"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "showsConnection(first:30,sort:\"FEATURED_ASC\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "routes_FairExhibitorsQuery",
    "operationKind": "query",
    "text": "query routes_FairExhibitorsQuery(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairExhibitors_fair\n    id\n  }\n}\n\nfragment FairExhibitorRail_show on Show {\n  internalID\n  href\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      id\n    }\n  }\n  counts {\n    artworks\n  }\n}\n\nfragment FairExhibitors_fair on Fair {\n  id\n  exhibitors: showsConnection(first: 30, sort: FEATURED_ASC) {\n    edges {\n      show: node {\n        id\n        counts {\n          artworks\n        }\n        ...FairExhibitorRail_show\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1ac901f746202b051e3b3db7a1f162e3';
export default node;
