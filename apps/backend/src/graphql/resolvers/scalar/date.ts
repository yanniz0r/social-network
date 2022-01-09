import { GraphQLScalarType } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(input: unknown) {
    if (typeof input === 'string' || typeof input === 'number') {
      return new Date(input)
    }
    throw Error(`Expected a string or number but received ${input}`)
  },
  serialize(output: unknown) {
    if (output instanceof Date) {
      return output.toISOString()
    }
    throw Error(`Expected a date but received ${output}`)
  }
})

export default dateScalar
