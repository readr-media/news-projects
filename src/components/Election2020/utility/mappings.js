import {get} from 'lodash'

export function mapCountyName (store, id) {
	return get(store, ['Election2020', 'gcs', 'data', 'region', id.toString(), 'name'], '')
}

export function mapRegionName (store, countyId, regionId) {
	return get(store, ['Election2020', 'gcs', 'data', 'region', countyId.toString(), 'zone', regionId.toString(), 'name' ], '')
}

export function mapRegislatorName (store, id) {
	return get(store, ['Election2020', 'gcs', 'data', 'legislator', id.toString(), 'name'], '')
}

export function mapRegislatorInfo (store, id) {
	return get(store, ['Election2020', 'gcs', 'data', 'legislator', id.toString()], {})
}

export function mapPresidentName (store, id) {
	console.log("mapPresidentName", store, id)
	return get(store, ['Election2020', 'gcs', 'data', 'president', id.toString(), 'name'], ' ')
}

export function mapPartyName (store, id) {
	return get(store, ['Election2020', 'gcs', 'data', 'party', id.toString()], '')
}