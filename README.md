# react-use-querystring-state

Mapping query string from url to Component state seamlessly, You can migrate from React `useState` to `useQueryStringState` at no cost.
[react-use-querystring-state](https://github.com/space-fe/react-use-querystring-state)

## Installation

Use `npm`
```shell
npm install react-use-querystring-state
```

## Usage

You can save a state such as string, object and any  JSON stringify value.

### string

```javascript
import React, { useState } from 'react'
import useQueryStringState from 'react-use-querystring-state'

// useState
//
// const [key1State, setKey1State] = useState('keyword')

const [key1State, setKey1State] = useQueryStringState('key1', 'keyword')
```

### object

```javascript
import React, { useState } from 'react'
import useQueryStringState from 'react-use-querystring-state'

// useState
//
// const [key2State, setKey2State] = useState({ a: '1', b: '2' })


const [key1State, setKey1State] = useQueryStringState('key2', { a: '1', b: '2' })

