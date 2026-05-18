import { PROJECT_TYPE_PLOT } from './ProjectFilterForm/ProjectFilterForm'

/**
 * Calculate booked and available units based on PType
 * if PType is plot take data from field plot
 * else take it from apartment/booked count
 *
 */
export default class UnitAvailability {
  totalUnits: number
  bookedUnits: number

  constructor(project: {
    PType: string | null
    booked_count: number | null
    apartment_count: number | null
    booked_plots: number | null
    plot_count: number | null
  }) {
    if (project.PType === PROJECT_TYPE_PLOT) {
      this.totalUnits = Number(project.plot_count)
      this.bookedUnits = Number(project.booked_plots)
      return
    }

    this.totalUnits = Number(project.apartment_count)
    this.bookedUnits = Number(project.booked_count)
  }

  isValid() {
    return !Number.isNaN(this.totalUnits) && !Number.isNaN(this.bookedUnits)
  }

  getBookedPercentage() {
    if (!this.isValid()) {
      return null
    }

    return (this.bookedUnits / this.totalUnits) * 100
  }

  getAvailableUnits() {
    if (!this.isValid()) {
      return null
    }

    return this.totalUnits - this.bookedUnits
  }

  getAvailablePercentage() {
    if (!this.isValid()) {
      return null
    }
    return ((this.getAvailableUnits() ?? 0) / this.totalUnits) * 100
  }
}
