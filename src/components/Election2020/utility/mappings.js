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
  return get(store.state, `Election2020.gcs.data.president.${id.toString()}.name`, ' ')
}

export function mapPartyName (store, id) {
	return get(store, ['Election2020', 'gcs', 'data', 'party', id.toString()], '')
}

export function mapPartyNameAbbr(name) {
  const mapping = {
    中國國民黨: '國民黨',
    民主進步黨: '民進黨',
    台灣團結聯盟: '台聯黨',
    中華統一促進黨: '統促黨',
    天宙和平統一家庭黨: '家庭黨',
    國會政黨聯盟: '國會黨',
    喜樂島聯盟: '喜樂島',
    台灣民眾黨: '民眾黨'
  }

  return mapping[name] || name
}
