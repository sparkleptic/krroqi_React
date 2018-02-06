
// Screen 1 Form

const UPDATE_PropertyFor 	= 'UPDATE_PropertyFor'
const UPDATE_REGION 		= 'UPDATE_REGION'
const UPDATE_BRANCH 		= 'UPDATE_BRANCH'
const UPDATE_DISTRICT 		= 'UPDATE_DISTRICT'
const UPDATE_ADDRESS 		= 'UPDATE_ADDRESS'
const UPDATE_UNITFLOOR 		= 'UPDATE_UNITFLOOR'
const UPDATE_LOCATIONONMAP 	= 'UPDATE_LOCATIONONMAP'

//  Screen 2 Form

const UPDATE_PROPERTYTITLE 			= 'UPDATE_PROPERTYTITLE'
const UPDATE_PROPERTYDESCRIPTION 	= 'UPDATE_PROPERTYDESCRIPTION'
const UPDATE_OWNERNAME 				= 'UPDATE_OWNERNAME'
const UPDATE_OWNERPHONE 			= 'UPDATE_OWNERPHONE'

//  Screen 3 Form

const UPDATE_AGENCY ='UPDATE_AGENCY'
const UPDATE_AGENT 	='UPDATE_AGENT'

// Screen 4 Form

const UPDATE_RENTPERMONTH 	= 'UPDATE_RENTPERMONTH'
const UPDATE_DATEAVAILABLE 	= 'UPDATE_DATEAVAILABLE'
const UPDATE_PROPERTYTYPE 	= 'UPDATE_PROPERTYTYPE'
const UPDATE_ROOMS 			= 'UPDATE_ROOMS'
const UPDATE_BATHROOMS 		= 'UPDATE_BATHROOMS'
const UPDATE_METERSQ 		= 'UPDATE_METERSQ'
const UPDATE_YEARBUILD 		= 'UPDATE_YEARBUILD'

//  Screen 6 Form

const UPDATE_VIEWR 					= 'UPDATE_VIEWR'
const UPDATE_FEATURESR 				= 'UPDATE_FEATURESR'
const UPDATE_COMMONFACILITIESR 		= 'UPDATE_COMMONFACILITIESR'
const UPDATE_ADDITIONALFEATURESR 	= 'UPDATE_ADDITIONALFEATURESR'	

//  Unfilled fields in form screens

const SCREEN_1 = 'SCREEN_1'
const SCREEN_2 = 'SCREEN_2'
const SCREEN_3 = 'SCREEN_3'
const SCREEN_4 = 'SCREEN_4'
const SCREEN_5 = 'SCREEN_5'
const SCREEN_6 = 'SCREEN_6'

export function updatePropertyFor(data) {
  return {
    type: UPDATE_PropertyFor,
    data: data,
  }
}

export function updateRegion(data) {
  return {
    type: UPDATE_REGION,
    data: data,
  }
}

export function updateBranch(data) {
  return {
    type: UPDATE_BRANCH,
    data: data,
  }
}

export function updateDistrict(data) {
  return {
    type: UPDATE_DISTRICT,
    data: data,
  }
}

export function updateAddress(data) {
  return {
    type: UPDATE_ADDRESS,
    data: data,
  }
}

export function updateUnitFloor(data) {
  return {
    type: UPDATE_UNITFLOOR,
    data: data,
  }
}

export function updateLocationOnMap(data) {
  return {
    type: UPDATE_LOCATIONONMAP,
    data: data,
  }
}

export function updatePropertyTitle(data) {
  return {
    type: UPDATE_PROPERTYTITLE,
    data: data,
  }
}

export function updatePropertyDescription(data) {
  return {
    type: UPDATE_PROPERTYDESCRIPTION,
    data: data,
  }
}

export function updateOwnerName(data) {
  return {
    type: UPDATE_OWNERNAME,
    data: data,
  }
}

export function updateOwnerPhone(data) {
  return {
    type: UPDATE_OWNERPHONE,
    data: data,
  }
}

export function updateAgency(data) {
  return {
    type: UPDATE_AGENCY,
    data: data,
  }
}

export function updateAgent(data) {
  return {
    type: UPDATE_AGENT,
    data: data,
  }
}

export function updateRentPerMonth(data) {
  return {
    type: UPDATE_RENTPERMONTH,
    data: data,
  }
}

export function updateDateAvailable(data) {
  return {
    type: UPDATE_DATEAVAILABLE,
    data: data,
  }
}

export function updatePropertyType(data) {
  return {
    type: UPDATE_PROPERTYTYPE,
    data: data,
  }
}
export function updateRooms(data) {
  return {
    type: UPDATE_ROOMS,
    data: data,
  }
}

export function updateBathrooms(data) {
  return {
    type: UPDATE_BATHROOMS,
    data: data,
  }
}

export function updateMeterSq(data) {
  return {
    type: UPDATE_METERSQ,
    data: data,
  }
}

export function updateYearBuild(data) {
  return {
    type: UPDATE_YEARBUILD,
    data: data,
  }
}

export function updateViewR(data) {
  return {
    type: UPDATE_VIEWR,
    data: data,
  }
}

export function updateFeaturesR(data) {
  return {
    type: UPDATE_FEATURESR,
    data: data,
  }
}

export function updateCommonFacilitiesR(data) {
  return {
    type: UPDATE_COMMONFACILITIESR,
    data: data,
  }
}

export function updateAdditionalFeaturesR(data) {
  return {
    type: UPDATE_ADDITIONALFEATURESR,
    data: data,
  }
}

export function updateScreen_1(data) {
  return {
    type: SCREEN_1,
    data: data,
  }
}

export function updateScreen_2(data) {
  return {
    type: SCREEN_2,
    data: data,
  }
}

export function updateScreen_3(data) {
  return {
    type: SCREEN_3,
    data: data,
  }
}

export function updateScreen_4(data) {
  return {
    type: SCREEN_4,
    data: data,
  }
}

export function updateScreen_5(data) {
  return {
    type: SCREEN_5,
    data: data,
  }
}

export function updateScreen_6(data) {
  return {
    type: SCREEN_6,
    data: data,
  }
}