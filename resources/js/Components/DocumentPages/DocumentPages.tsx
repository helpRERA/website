import React from 'react';
import { AgreementData } from '../../hooks/useAgreementData';
import { formatDateDMY } from '../../utils/formatDate';

// Helper component for underlined / highlighted placeholders
interface SpanValProps {
  val: string | undefined;
  fallback?: string;
  fieldKey?: string;
}

const SpanVal: React.FC<SpanValProps> = ({ val, fallback = '', fieldKey }) => {
  const displayVal = val && val.trim() !== '' ? val : fallback;
  const isTrulyEmpty = !displayVal || displayVal.trim() === '';
  const isEmpty = (!val || val.trim() === '') && !fallback.includes('______');
  return (
    <span
      className={`placeholder-field ${isEmpty ? 'empty' : ''} ${isTrulyEmpty ? 'truly-empty' : ''}`}
      data-field={fieldKey}
    >
      {isTrulyEmpty ? '\u00A0' : displayVal}
    </span>
  );
};

const BlankLine: React.FC<{ width?: string }> = ({ width = '110px' }) => (
  <span
    style={{
      display: 'inline-block',
      width,
      borderBottom: '1px dashed #c2952b',
      height: '1em',
      verticalAlign: 'middle',
      margin: '0 2px',
    }}
  />
);




interface DocumentPagesProps {
  data: AgreementData;
  activeField?: string | null;
}

export default function DocumentPages({ data }: DocumentPagesProps) {
  // activeField prop accepted but field highlighting is done via data-field + CSS in PreviewPanel
  const {
    dateDay, dateMonth, dateYear, executionPlace,
    promoterType, promoterCompany, promoterPartnership, promoterIndividual,
    allotteeType, allotteeCompany, allotteePartnership, allotteeIndividual, allotteeHuf,
    jointAllottees,
    landSurveyNos, landAdmeasuring, landSituatedAt, landTehsil, landDistrict, landDeedType, landDeedSubRegistrarOffice, landOwnershipType, landJDA,
    projectType, projectBuildingType, projectComprising, projectName, projectOtherComponents, plotOtherComponents,
    commencementAuthority, commencementNo, commencementDate, layoutAuthority, reraRegNo, reraRegDate,
    unitNo, unitFloor, unitTower, unitCarpetArea, garageDetails, plotNo, plotArea,
    ratePerSqFt, totalPrice, totalPriceWords, priceBreakdown, paymentPlan,
    earlyPaymentRebate, delayInterestRate, possessionTargetMonth, gracePeriodDays,
    relevantStateAct, apartmentOwnershipAct, witnesses,
    landTitleDeedDate, landTitleDeedRegNo, basementLocation, placeOfExecution, placeOfDeemedExecution,
    applicationNo, applicationDate, apartmentType,
    bookingAmount, bookingAmountWords, paymentFavourOf, paymentPayableAt,
    maintenanceClauses,
    defaultConsecutiveDemands, defaultConsecutiveMonths,
    prescribedByLaws, additionalDisclosures, additionalTerms,
    facilitiesOutsideProject, competentAuthorityForDeclaration,
    hasEncumbrances, encumbranceDetails
  } = data;


  const resolvedProjectType = projectType === 'other' ? data.projectTypeOther : projectType;
  const resolvedBuildingType = projectBuildingType === 'other' ? data.projectBuildingTypeOther : projectBuildingType;

  return (
    <div className="paper-container" id="preview-content">


      {/* PAGE 26 */}
      <div className="paper-page">


        <div className="page-number">26</div>
        <div className="page-content">
          <div className="legal-header">
            <h3>ANNEXURE 'A'</h3>
            <p style={{ fontStyle: 'italic', margin: 0 }}>[See rule 10]</p>
            <h2>AGREEMENT FOR SALE</h2>
          </div>

          <p>
            This Agreement for Sale ("Agreement") executed on this <SpanVal val={dateDay} fieldKey="dateDay" /> day of <SpanVal val={dateMonth} fieldKey="dateMonth" />, <SpanVal val={dateYear} fieldKey="dateYear" /> at <SpanVal val={executionPlace} fieldKey="executionPlace" />,
          </p>

          <p style={{ textAlign: 'center', fontWeight: 'bold', margin: '1.5rem 0' }}>By and Between</p>

          {/* PROMOTER COMPANY */}
          {promoterType === 'company' && (
            <div className="placeholder-block active">
              <p style={{ fontStyle: 'italic', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>[If the promoter is a company]</p>
              <p>
                <SpanVal val={promoterCompany.name} fieldKey="promoterCompany.name" /> (CIN No. <SpanVal val={promoterCompany.cin} fieldKey="promoterCompany.cin" />), a company incorporated under the provisions of the Companies Act, (Central Act 18 of 2015, 1956 or 2013, as the case may be), having its registered office at <SpanVal val={promoterCompany.registeredOffice} fieldKey="promoterCompany.registeredOffice" /> and its corporate office at <SpanVal val={promoterCompany.corporateOffice} fieldKey="promoterCompany.corporateOffice" /> (PAN <SpanVal val={promoterCompany.pan} fieldKey="promoterCompany.pan" />), represented by its authorized signatory <SpanVal val={promoterCompany.authorizedSignatory} fieldKey="promoterCompany.authorizedSignatory" /> (Aadhaar No. <SpanVal val={promoterCompany.signatoryAadhaar} fieldKey="promoterCompany.signatoryAadhaar" />) authorized <i>vide</i> board resolution dated <SpanVal val={formatDateDMY(promoterCompany.boardResolutionDate)} fieldKey="promoterCompany.boardResolutionDate" /> hereinafter referred to as the <b>"Promoter"</b> (which expression shall unless repugnant to the context or meaning thereof be deemed to mean and include its successor-in-interest, executors, administrators and permitted assignees);
              </p>
            </div>
          )}

          {/* PROMOTER PARTNERSHIP */}
          {promoterType === 'partnership' && (
            <div className="placeholder-block active">
              <p style={{ fontStyle: 'italic', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>[If the promoter is a Partnership firm]</p>
              <p>
                <SpanVal val={promoterPartnership.name} fieldKey="promoterPartnership.name" />, a partnership firm registered under the Indian Partnership Act, 1932 (Central Act 12 of 1932) having its principal place of business at <SpanVal val={promoterPartnership.businessPlace} fieldKey="promoterPartnership.businessPlace" /> (PAN <SpanVal val={promoterPartnership.pan} fieldKey="promoterPartnership.pan" />), represented by its authorized Partner <SpanVal val={promoterPartnership.authorizedPartner} fieldKey="promoterPartnership.authorizedPartner" /> (Aadhaar No. <SpanVal val={promoterPartnership.partnerAadhaar} fieldKey="promoterPartnership.partnerAadhaar" />) authorized <i>vide</i> <SpanVal val={promoterPartnership.authorizedVide} fieldKey="promoterPartnership.authorizedVide" />, hereinafter referred to as the <b>"Promoter"</b> (which expression shall unless repugnant to the context or meaning thereof be deemed to mean and include its successors-in-interest, executors, administrators and permitted assignees, including those of the respective partners);
              </p>
            </div>
          )}

          {/* PROMOTER INDIVIDUAL */}
          {promoterType === 'individual' && (
            <div className="placeholder-block active">
              <p style={{ fontStyle: 'italic', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>[If the promoter is an Individual]</p>
              <p>
                Mr./Ms. <SpanVal val={promoterIndividual.name} fieldKey="promoterIndividual.name" />, (Aadhaar No. <SpanVal val={promoterIndividual.aadhaar} fieldKey="promoterIndividual.aadhaar" />) {promoterIndividual.parentType === 'son' ? 'son' : 'daughter'} of <SpanVal val={promoterIndividual.parentName} fieldKey="promoterIndividual.parentName" /> aged about <SpanVal val={promoterIndividual.age} fieldKey="promoterIndividual.age" /> residing at <SpanVal val={promoterIndividual.residing} fieldKey="promoterIndividual.residing" />, (PAN <SpanVal val={promoterIndividual.pan} fieldKey="promoterIndividual.pan" />), hereinafter called the <b>"Promoter"</b> (which expression shall unless repugnant to the context or meaning thereof be deemed to mean and include his/her heirs, executors, administrators, successors-in-interest and permitted assignees).
              </p>
            </div>
          )}

          <p style={{ textAlign: 'center', fontWeight: 'bold', margin: '1rem 0' }}>AND</p>

          {/* ALLOTTEE INDIVIDUAL */}
          <div className="placeholder-block active">
            <p style={{ fontStyle: 'italic', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>[If the Allottee is an Individual]</p>
            <p>
              Mr./Ms. <SpanVal val={allotteeIndividual.name} fieldKey="allotteeIndividual.name" />, (Aadhaar No. <SpanVal val={allotteeIndividual.aadhaar} fieldKey="allotteeIndividual.aadhaar" />) son/daughter of <SpanVal val={allotteeIndividual.parentName} fieldKey="allotteeIndividual.parentName" />, aged about <SpanVal val={allotteeIndividual.age} fieldKey="allotteeIndividual.age" />, residing at <SpanVal val={allotteeIndividual.residing} fieldKey="allotteeIndividual.residing" />, (PAN <SpanVal val={allotteeIndividual.pan} fieldKey="allotteeIndividual.pan" />), hereinafter called the <b>"Allottee"</b> (which expression shall unless repugnant to the context or meaning thereof be deemed to mean and include his/her heirs, executors, administrators, successors-in-interest and permitted assignees).
            </p>
          </div>

          <p style={{ textAlign: 'center', fontWeight: 'bold', margin: '1rem 0' }}>OR</p>

          {/* ALLOTTEE COMPANY */}
          <div className="placeholder-block active">
            <p style={{ fontStyle: 'italic', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>[If the Allottee is a company]</p>
            <p>
              <SpanVal val={allotteeCompany.name} fieldKey="allotteeCompany.name" /> (CIN No. <SpanVal val={allotteeCompany.cin} fieldKey="allotteeCompany.cin" />) a company incorporated under the provisions of the Companies Act, Central Act 1 of 1956, (1956 or 2013, as the case may be), having its registered office at <SpanVal val={allotteeCompany.registeredOffice} fieldKey="allotteeCompany.registeredOffice" /> (PAN <SpanVal val={allotteeCompany.pan} fieldKey="allotteeCompany.pan" />), represented by its authorized signatory, <SpanVal val={allotteeCompany.authorizedSignatory} fieldKey="allotteeCompany.authorizedSignatory" />, (Aadhaar No. <SpanVal val={allotteeCompany.signatoryAadhaar} fieldKey="allotteeCompany.signatoryAadhaar" />) duly authorized <i>vide</i> board resolution dated <SpanVal val={allotteeCompany.boardResolutionDate} fieldKey="allotteeCompany.boardResolutionDate" />, hereinafter referred to as the <b>"Allottee"</b> (which expression shall unless repugnant to the context or meaning thereof be deemed to mean and include its successor-in-interest, executors, administrators and permitted assignees).
            </p>
          </div>

          <p style={{ textAlign: 'center', fontWeight: 'bold', margin: '1rem 0' }}>OR</p>

          {/* ALLOTTEE PARTNERSHIP */}
          <div className="placeholder-block active">
            <p style={{ fontStyle: 'italic', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>[If the Allottee is a Partnership]</p>
            <p>
              <SpanVal val={allotteePartnership.name} fieldKey="allotteePartnership.name" />, a partnership firm registered under the Indian Partnership Act, 1932 (Central Act 12 of 1932) having its principal place of business at <SpanVal val={allotteePartnership.businessPlace} fieldKey="allotteePartnership.businessPlace" /> (PAN <SpanVal val={allotteePartnership.pan} fieldKey="allotteePartnership.pan" />), represented by its authorized partner, <SpanVal val={allotteePartnership.authorizedPartner} fieldKey="allotteePartnership.authorizedPartner" /> (Aadhaar No. <SpanVal val={allotteePartnership.partnerAadhaar} fieldKey="allotteePartnership.partnerAadhaar" />) authorized <i>vide</i> <SpanVal val={allotteePartnership.authorizedVide} fieldKey="allotteePartnership.authorizedVide" />, hereinafter referred to as the <b>"Allottee"</b> (which expression shall unless repugnant to the context or meaning thereof be deemed to mean and include its successors-in-interest, executors, administrators and permitted assignees, including those of the respective partners).
            </p>
          </div>

          <p style={{ textAlign: 'center', fontWeight: 'bold', margin: '1rem 0' }}>OR</p>

          {/* ALLOTTEE HUF */}
          <div className="placeholder-block active">
            <p style={{ fontStyle: 'italic', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>[If the Allottee is a HUF]</p>
            <p>
              Mr. <SpanVal val={allotteeHuf.kartaName} fieldKey="allotteeHuf.kartaName" />, (Aadhaar No. <SpanVal val={allotteeHuf.kartaAadhaar} fieldKey="allotteeHuf.kartaAadhaar" />) son/daughter of <SpanVal val={allotteeHuf.parentName} fieldKey="allotteeHuf.parentName" /> aged about <SpanVal val={allotteeHuf.age} fieldKey="allotteeHuf.age" /> for self and as the Karta of the Hindu Joint Mitakshara Family known as <SpanVal val={allotteeHuf.familyName} fieldKey="allotteeHuf.familyName" /> HUF, having its place of business/residence at <SpanVal val={allotteeHuf.place} fieldKey="allotteeHuf.place" />, (PAN <SpanVal val={allotteeHuf.pan} fieldKey="allotteeHuf.pan" />), hereinafter referred to as the <b>"Allottee"</b> (which expression shall unless repugnant to the context or meaning thereof be deemed to include his heirs, representatives, executors, administrators, successors-in-interest and permitted assigns as well as the members of the said HUF, their heirs, executors, administrators, successors-in-interest and permitted assignees).
            </p>
          </div>

          {/* JOINT ALLOTTEES */}
          {jointAllottees.length > 0 && (
            <div style={{ marginTop: '0.5rem', borderTop: '1px solid #ddd', paddingTop: '0.5rem' }}>
              <p style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '9.5pt', margin: '0 0 0.25rem 0' }}>
                [Details of other Allottee(s), in case of more than one Allottee]:
              </p>
              {jointAllottees.map((ja, idx) => (
                <div key={ja.id} style={{ fontSize: '9.5pt', marginBottom: '0.5rem', paddingLeft: '1rem', borderLeft: '2px solid #ccc' }}>
                  <b>Joint Allottee #{idx + 2}:</b> Mr./Ms. <SpanVal val={ja.name} fieldKey="jointAllottees" /> (Aadhaar No. <SpanVal val={ja.aadhaar} fieldKey="jointAllottees" />) {ja.parentType === 'son' ? 'son' : ja.parentType === 'daughter' ? 'daughter' : 'wife'} of <SpanVal val={ja.parentName} fieldKey="jointAllottees" />, aged <SpanVal val={ja.age} fieldKey="jointAllottees" /> years, residing at <SpanVal val={ja.residing} fieldKey="jointAllottees" /> (PAN <SpanVal val={ja.pan} fieldKey="jointAllottees" />).
                </div>
              ))}
            </div>
          )}

          <p style={{ marginTop: '1rem' }}>
            The Promoter and Allottee shall hereinafter collectively be referred to as the <b>"Parties"</b> and individually as a <b>"Party"</b>.
          </p>

          <p className="legal-section-title" style={{ marginTop: '1rem' }}>WHEREAS:</p>
          <div className="indent-1">
            A. The Promoter is the absolute and lawful owner of (survey Nos.) (Please insert land details as per local laws). <SpanVal val={landSurveyNos} fieldKey="landSurveyNos" /> totally admeasuring <SpanVal val={landAdmeasuring} fieldKey="landAdmeasuring" /> square meters situated at <SpanVal val={landSituatedAt} fieldKey="landSituatedAt" /> in Tehsil <SpanVal val={landTehsil} fieldKey="landTehsil" /> and District <SpanVal val={landDistrict} fieldKey="landDistrict" /> ("Said Land") vide <SpanVal val={landDeedType ? landDeedType.toLowerCase() + '(s)' : ''} fieldKey="landDeedType" /> dated <SpanVal val={formatDateDMY(landTitleDeedDate)} fieldKey="landTitleDeedDate" /> registered as documents No. <SpanVal val={landTitleDeedRegNo} fieldKey="landTitleDeedRegNo" /> at the office of the Sub-Registrar<SpanVal val={landDeedSubRegistrarOffice ? ` ${landDeedSubRegistrarOffice}` : ''} fieldKey="landDeedSubRegistrarOffice" />;
          </div>

          {landOwnershipType === 'developer' && landJDA.length > 0 && (
            <p className="or-separator" style={{ margin: '0.5rem 0' }}>OR</p>
          )}

          {landOwnershipType === 'developer' && landJDA.map((jda, idx) => (
            <div key={jda.id} style={{ padding: '0.5rem', marginBottom: '0.75rem' }}>
              {idx > 0 && (
                <p style={{ fontSize: '9pt', fontWeight: 'bold', margin: '0 0 0.25rem 2rem' }}>
                  JDA Details ({idx + 1}):
                </p>
              )}
              <div style={{ paddingLeft: '2rem', marginBottom: 0 }}>
                <SpanVal val={jda.ownerName} fieldKey="landJDA" /> ("Owner") is the absolute and lawful owner of (khasra Nos./survey Nos.) <SpanVal val={jda.surveyNos} fieldKey="landJDA" /> totally admeasuring <SpanVal val={jda.admeasuring} fieldKey="landJDA" /> square meters situated at <SpanVal val={jda.situatedAt} fieldKey="landJDA" /> in Tehsil <SpanVal val={jda.tehsil} fieldKey="landJDA" /> and District <SpanVal val={jda.district} fieldKey="landJDA" /> vide <SpanVal val={jda.deedType ? jda.deedType.toLowerCase() + '(s)' : ''} fieldKey="landJDA" /> dated <SpanVal val={formatDateDMY(jda.titleDeedDate)} fieldKey="landJDA" /> registered as documents No. <SpanVal val={jda.titleDeedRegNo} fieldKey="landJDA" /> at the office of the Sub-Registrar<SpanVal val={jda.deedSubRegistrarOffice ? `, ${jda.deedSubRegistrarOffice}` : ''} fieldKey="landJDA" />. The Owner and the Promoter have entered into a (collaboration/development/joint development) agreement dated <SpanVal val={formatDateDMY(jda.jdaDate)} fieldKey="landJDA" /> registered as document No. <SpanVal val={jda.regNo} fieldKey="landJDA" /> at the office of the Sub-Registrar <SpanVal val={jda.subRegistrarOffice} fieldKey="landJDA" />{jda.additionalDetails ? ` ` : ''}{jda.additionalDetails ? <SpanVal val={jda.additionalDetails} fieldKey="landJDA" /> : ''};
              </div>
            </div>
          ))}


          {projectType !== 'plotted' ? (
            <div className="indent-1">
              B. The Said Land is earmarked for the purpose of building a <SpanVal val={resolvedBuildingType} fieldKey="projectBuildingType" /> project, comprising <SpanVal val={projectComprising} fieldKey="projectComprising" /> multistoried apartment buildings and <SpanVal val={projectOtherComponents} fieldKey="projectOtherComponents" /> and the said project shall be known as '<SpanVal val={projectName} fieldKey="projectName" />' (<b>"Project"</b>);
            </div>
          ) : (
            <div style={{ border: '1.5px dashed var(--accent-gold)', padding: '0.5rem', borderRadius: '4px', marginBottom: '0.75rem' }}>
              <div className="indent-1" style={{ marginBottom: 0 }}>
                B. The Said Land is earmarked for the purpose of plotted development of a <SpanVal val={resolvedBuildingType} fieldKey="projectBuildingType" /> project, comprising plots and <SpanVal val={plotOtherComponents} fieldKey="plotOtherComponents" /> and the said project shall be known as '<SpanVal val={projectName} fieldKey="projectName" />' (<b>"Project"</b>);
              </div>
            </div>
          )}

          <p style={{ fontStyle: 'italic', margin: '0.5rem 0 0.5rem 2rem', fontSize: '9.5pt' }}>
            Provided that where land is earmarked for any institutional development the same shall be used for those purposes only and no commercial/residential development shall be permitted unless it is a part of the plan approved by the competent authority.
          </p>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            C. The Promoter is fully competent to enter into this Agreement and all the legal formalities with respect to the right, title and interest of the Promoter regarding the Said Land on which Project is to be constructed have been completed;
          </div>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            D. The <SpanVal val={commencementAuthority} fieldKey="commencementAuthority" /> has granted the commencement certificate to develop the Project vide approval dated <SpanVal val={formatDateDMY(commencementDate)} fieldKey="commencementDate" /> bearing No. <SpanVal val={commencementNo} fieldKey="commencementNo" />;
          </div>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            E. The Promoter has obtained the final layout plan approvals for the Project from <SpanVal val={layoutAuthority} fieldKey="layoutAuthority" />. The Promoter agrees and undertakes that it shall not make any changes to these layout plans except in strict compliance with section 14 of the Act and other laws as applicable;
          </div>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            F. The Promoter has registered the Project under the provisions of the Act with the Real Estate Regulatory Authority at <BlankLine /> on <SpanVal val={reraRegDate} fieldKey="reraRegDate" /> under the registration No. <SpanVal val={reraRegNo} fieldKey="reraRegNo" />;
          </div>
          {projectType !== 'plotted' ? (
            <div className="indent-1">
              G. The Allottee had applied for an apartment in the Project vide application No. <SpanVal val={applicationNo} fieldKey="applicationNo" /> dated <SpanVal val={applicationDate} fieldKey="applicationDate" /> and has been allotted apartment No. <SpanVal val={unitNo} fieldKey="unitNo" /> having carpet area of <SpanVal val={unitCarpetArea} fieldKey="unitCarpetArea" /> square feet, type <SpanVal val={apartmentType} fieldKey="apartmentType" /> on <SpanVal val={unitFloor} fieldKey="unitFloor" /> floor in <SpanVal val={unitTower} fieldKey="unitTower" /> ("Building") along with garage/closed parking No. <BlankLine /> admeasuring <SpanVal val={garageDetails[0]?.area || ''} fieldKey="garageArea" /> square feet in the <BlankLine />(Please insert the
              location of the garage/closed parking), as permissible under the applicable law and of <i>pro rata</i> share in the common areas ("Common Areas") as defined under clause (n) of Section 2 of the Act (hereinafter referred to as the "Apartment" more particularly described in Schedule A and the floor plan of the apartment is annexed hereto and marked as Schedule B);
            </div>
          ) : (
            <div style={{ border: '1.5px dashed var(--accent-gold)', padding: '0.5rem', borderRadius: '4px', marginBottom: '0.75rem' }}>
              <div className="indent-1" style={{ marginBottom: 0 }}>
                G. The Allottee had applied for a plot in the Project vide application No. <SpanVal val={applicationNo} fieldKey="applicationNo" /> dated <SpanVal val={applicationDate} fieldKey="applicationDate" /> and has been allotted plot No. <SpanVal val={plotNo} fieldKey="plotNo" /> having area of <SpanVal val={plotArea} fieldKey="plotArea" /> square feet and plot for garage/closed parking admeasuring <SpanVal val={garageDetails[0]?.area || ''} fallback="" fieldKey="garageArea" /> square feet (if applicable) in the <SpanVal val={projectName} fieldKey="projectName" /> (Please insert the location of
                the garage/closed parking), as permissible under the applicable law and of <i>pro rata</i> share in the common areas (hereinafter referred to as the "Plot" more particularly described in Schedule A);
              </div>
            </div>
          )}

          <div className="indent-1" style={{ marginTop: '1.5rem' }}>
            H. The Parties have gone through all the terms and conditions set out in this Agreement and understood the mutual rights and obligations detailed herein;
          </div>

          <div className="indent-1" style={{ marginTop: '1.5rem' }}>
            I. {data.additionalDisclosures.length > 0 ? (
              <div style={{ margin: '0.5rem 0' }}>
                {data.additionalDisclosures.map((item, idx) => (
                  <div
                    key={item.id}
                    data-field="additionalDisclosures"
                    style={{ paddingLeft: '1.5rem', marginBottom: '0.25rem' }}
                  >
                    {idx + 1}. {item.text}
                  </div>
                ))}
              </div>
            ) : (
              <span className="placeholder">(Please enter any additional disclosures/details)</span>
            )}
          </div>

          <div className="indent-1" style={{ marginTop: '1.5rem' }}>
            J. The Parties hereby confirm that they are signing this Agreement with full knowledge of all the laws, rules, regulations, notifications, etc., applicable to the Project;
          </div>

          <div className="indent-1" style={{ marginTop: '1.5rem' }}>
            K. The Parties, relying on the confirmations, representations and assurances of each other to faithfully abide by all the terms, conditions and stipulations contained in this Agreement and all applicable laws, are now willing to enter into this Agreement on the terms and conditions appearing hereinafter;
          </div>

          <div className="indent-1" style={{ marginTop: '1.5rem' }}>
            L. In accordance with the terms and conditions set out in this Agreement and as mutually agreed upon by and between the Parties, the Promoter hereby agrees to sell and the Allottee hereby agrees to purchase the [Apartment/Plot] and the garage/closed parking as specified in para G;
          </div>

          <p style={{ fontWeight: 'bold' }}>
            NOW, THEREFORE, in consideration of the mutual representations, covenants, assurances, promises and agreements contained herein and other good and valuable consideration, the Parties agree as follows:
          </p>

          <p className="legal-section-title">1. Terms:</p>
          <div className="indent-1">
            1.1 Subject to the terms and conditions as detailed in this Agreement, the Promoter agrees to sell to the Allottee and the Allottee hereby agrees to purchase the [Apartment/Plot] as specified in para G;
          </div>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            1.2 The Total Price for the [Apartment/Plot] based on the carpet area is Rs. <SpanVal val={totalPrice} fieldKey="totalPrice" /> (<SpanVal val={totalPriceWords} fieldKey="totalPriceWords" />) ("Total Price") (Give break up and description):
          </div>

          <table className="doc-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}>{'Block/Building/Tower No.\nApartment No./Type/Floor'}</th>
                <th style={{ textAlign: 'center' }}>Rate of Apartment per square feet*</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>Tower: <SpanVal val={unitTower} fieldKey="unitTower" /> | Apt: <SpanVal val={unitNo} fieldKey="unitNo" /> | Floor: <SpanVal val={unitFloor} fieldKey="unitFloor" /></td>
                <td style={{ textAlign: 'center' }}>Rs. <SpanVal val={ratePerSqFt} fieldKey="ratePerSqFt" /></td>
              </tr> */}
              {/* Dynamic breakdown inside the same table */}
              {priceBreakdown.map((row) => (
                <tr key={row.id} data-field="priceBreakdown">
                  <td>{row.description || 'Description'}</td>
                  <td style={{ textAlign: 'center' }}>Rs. {row.amount || '0'}</td>
                </tr>
              ))}
              {/* Empty rows to match official format if no breakdown is provided */}
              {priceBreakdown.length === 0 && (
                <>
                  <tr data-field="priceBreakdown"><td style={{ height: '24px' }}></td><td></td></tr>
                  <tr data-field="priceBreakdown"><td style={{ height: '24px' }}></td><td></td></tr>
                </>
              )}
            </tbody>
          </table>

          <p style={{ fontSize: '9pt', fontStyle: 'italic', margin: '0.5rem 0' }}>
            *Provide break up of the amounts such as cost of apartment, proportionate cost of common areas, preferential location charges, cost of other amenities, taxes etc.
          </p>

          {/* Garage Pricing Table */}
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontWeight: 'bold', margin: '0.25rem 0' }}>[AND] [if/as applicable]</p>
            <table className="doc-table">
              <tbody>
                {garageDetails.length > 0 ? (
                  garageDetails.map((g) => (
                    <tr key={g.id} data-field="garageNo">
                      <td style={{ textAlign: 'center' }}><SpanVal val={g.no} fallback="" fieldKey="garageNo" /></td>
                      <td style={{ textAlign: 'center' }}><BlankLine width="150px" /></td>
                    </tr>
                  ))
                ) : (
                  <tr data-field="garageNo">
                    <td style={{ height: '24px' }}></td>
                    <td style={{ textAlign: 'center' }}><BlankLine width="150px" /></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
            <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0', textAlign: 'center' }}>OR</p>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}>{'Plot No.\nType'}</th>
                  <th style={{ textAlign: 'center' }}>Rate of Plot per square feet</th>
                </tr>
              </thead>
              <tbody>
                {data.plotPricing.length > 0 ? (
                  data.plotPricing.map((p) => (
                    <tr key={p.id} data-field="plotPricing">
                      <td style={{ textAlign: 'center' }}>{p.plotNoType || ''}</td>
                      <td style={{ textAlign: 'center' }}><BlankLine width="150px" /></td>
                    </tr>
                  ))
                ) : (
                  <tr data-field="plotPricing">
                    <td style={{ height: '24px' }}></td>
                    <td style={{ textAlign: 'center' }}><BlankLine width="150px" /></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>



          <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Explanation:—</p>
          <div className="indent-1" style={{ fontSize: '10pt', lineHeight: '1.5' }}>
            (i) The Total Price above includes the booking amount paid by the allottee to the Promoter towards the [Apartment/Plot];
          </div>
          <div className="indent-1" style={{ fontSize: '10pt', lineHeight: '1.5' }}>
            (ii) The Total Price above includes Taxes (consisting of tax paid or payable by the Promoter by way of Goods and Service Tax and Cess or any other similar taxes which may be levied, in connection with the construction of the Project payable by the Promoter) up to the date of handing over the possession of the [Apartment/Plot]:
          </div>
          <p style={{ fontStyle: 'italic', margin: '0.25rem 0 0.25rem 2rem', fontSize: '9.5pt' }}>
            Provided that in case there is any change/modification in the taxes, the subsequent amount payable by the allottee to the promoter shall be increased/reduced based on such change/modification;
          </p>
          <div className="indent-1" style={{ fontSize: '10pt', lineHeight: '1.5' }}>
            (iii) The Promoter shall periodically intimate to the Allottee, the amount payable as stated in (i) above and the Allottee shall make payment within 30 (thirty) days from the date of such written intimation. In addition, the Promoter shall provide to the Allottee the details of the taxes paid or demanded along with the acts/rules/notifications together with dates from which such taxes/levies etc. have been imposed or become effective;
          </div>
          <div className="indent-1" style={{ fontSize: '10pt', lineHeight: '1.5' }}>
            (iv) The Total Price of [Apartment/Plot] includes: (1) <i>pro rata</i> share in the Common Areas; and (2) garage(s)/closed parking(s) as provided in the agreement.
          </div>

          <div className="indent-1" style={{ marginTop: '1.5rem' }}>
            1.3 The Total Price is escalation-free, save and except increases which the Allottee hereby agrees to pay, due to increase on account of development charges payable to the competent authority and/or any other increase in charges which may be levied or imposed by the competent authority from time to time. The Promoter undertakes and agrees that while raising a demand on the Allottee for increase in development charges, cost/charges imposed by the competent authorities, the Promoter shall enclose the said notification/order/rule/regulation to that effect along with the demand letter being issued to the Allottee, which shall only be applicable on subsequent payments.
          </div>

          <div className="indent-1">
            1.4 The Allottee(s) shall make the payment as per the payment plan set out in Schedule C (<b>"Payment Plan"</b>).
          </div>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            1.5 The Promoter may allow, in its sole discretion, a rebate for early payments of installments payable by the Allottee by discounting such early payments @ <SpanVal val={earlyPaymentRebate} fieldKey="earlyPaymentRebate" />% per annum for the period by which the respective installment has been preponed. The provision for allowing rebate and such rate of rebate shall not be subject to any revision/withdrawal, once granted to an Allottee by the Promoter.
          </div>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            1.6 It is agreed that the Promoter shall not make any additions and alterations in the sanctioned plans, layout plans and specifications and the nature of fixtures, fittings and amenities described therein in respect of the apartment, plot or building, as the case may be, without the previous written consent of the Allottee. Provided that the Promoter may make such minor additions or alterations as may be required by the Allottee, or such minor changes or alterations as per the provisions of the Act.
          </div>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            1.7 <i>(Applicable in case of an apartment)</i> The Promoter shall confirm the final carpet area that has been allotted to the Allottee after the construction of the Building is complete and the occupancy certificate* is granted by the competent authority, by furnishing details of the changes, if any, in the carpet area. The total price payable for the carpet area shall be recalculated upon confirmation by the Promoter. If there is any reduction in the carpet area within the defined limit then Promoter shall refund the excess money paid by Allottee within forty-five days with annual interest at the rate specified in the Rules, from the date when such an excess amount was paid by the Allottee. If there is any increase in the carpet area allotted to Allottee, the Promoter shall demand that from the Allottee as per the next milestone of the Payment Plan. All these monetary adjustments shall be made at the same rate per square feet as agreed in Clause 1.2 of this Agreement.
          </div>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            1.8 Subject to Clause 9.3 the Promoter agrees and acknowledges, the Allottee shall have the right to the (Apartment/Plot) as mentioned below:
            <div className="indent-2" style={{ marginTop: '0.25rem' }}>
              (i) The Allottee shall have exclusive ownership of the (Apartment/Plot);
            </div>
            <div className="indent-2">
              (ii) The Allottee shall also have undivided proportionate share in the Common Areas. Since the share/interest of Allottee in the Common Areas is undivided and cannot be divided or separated, the Allottee shall use the Common Areas along with other occupants, maintenance staff etc., without causing any inconvenience or hindrance to them. Further, the right of the Allottee to use the Common Areas shall always be subject to the timely payment of maintenance charges and other charges as applicable. It is clarified that the promoter shall convey undivided proportionate title in the common areas to the association of allottees as provided in the Act;
            </div>
            <div className="indent-2">
              (iii) That the computation of the price of the (Apartment/Plot) includes recovery of price of land, construction of (not only the Apartment but also) the Common Areas, internal development charges, external development charges, taxes, cost of providing electric wiring, fire detection and firefighting equipment in the common areas etc. and includes cost for providing all other facilities as provided within the Project.
            </div>
          </div>

          <div className="indent-1" style={{ marginTop: '1.5rem' }}>
            1.9 It is made clear by the Promoter and the Allottee agrees that the (Apartment/Plot) along with garage/closed parking shall be treated as a single indivisible unit for all purposes. It is agreed that the Project is an independent, self-contained Project covering the said Land and is not a part of any other project or zone and shall not form a part of and/or linked/combined with any other project in its vicinity or otherwise except for the purpose of integration of infrastructure for the benefit of the Allottee. It is clarified that Project's facilities and amenities shall be available only for use and enjoyment of the Allottees of the Project.
          </div>

          <div className="indent-1" style={{ marginTop: '1.5rem', textAlign: 'left' }}>
            1.10 It is understood by the Allottee that all other areas and i.e. areas and facilities falling outside the Project, namely <SpanVal val={facilitiesOutsideProject} fallback="" fieldKey="facilitiesOutsideProject" /> shall not form a part of the declaration to be filed with <SpanVal val={competentAuthorityForDeclaration} fallback="(Please insert the name of the concerned competent authority)" fieldKey="competentAuthorityForDeclaration" /> to be filed in accordance with the <SpanVal val={relevantStateAct} fallback="(Please insert the name of the relevant State act, if any)" fieldKey="relevantStateAct" />.
          </div>

          <div className="indent-1" style={{ marginTop: '1.5rem' }}>
            1.11 The Promoter agrees to pay all outgoings before transferring the physical possession of the apartment to the Allottees, which it has collected from the Allottees, for the payment of outgoings (including land cost, ground rent, municipal or other local taxes, charges for water or electricity, maintenance charges, including mortgage loan and interest on mortgages or other encumbrances and such other liabilities payable to competent authorities, banks and financial institutions, which are related to the project). If the Promoter fails to pay all or any of the outgoings collected by it from the Allottees or any liability, mortgage loan and interest thereon before transferring the apartment to the Allottees, the Promoter agrees to be liable, even after the transfer of the property, to pay such outgoings and penal charges, if any, to the authority or person to whom they are payable and be liable for the cost of any legal proceedings which may be taken therefore by such authority or person.
          </div>

          <div className="indent-1">
            1.12 The Allottee has paid a sum of Rs. <SpanVal val={bookingAmount} fieldKey="bookingAmount" /> (Rupees <SpanVal val={bookingAmountWords} fieldKey="bookingAmountWords" /> only) as booking amount being part payment towards the Total Price of the (Apartment/Plot) at the time of application the receipt of which the Promoter hereby acknowledges and the Allottee hereby agrees to pay the remaining price of the (Apartment/Plot) as prescribed in the Payment Plan as may be demanded by the Promoter within the time and in the manner specified therein:
          </div>
          {/* <p style={{ fontStyle: 'italic', margin: '0.5rem 0 0.5rem 2rem', fontSize: '9.5pt' }}>
            Provided that if the allottee delays in payment towards any amount for which is payable, he shall be liable to pay interest at the rate of <SpanVal val={delayInterestRate} fieldKey="delayInterestRate" />% p.a..
          </p> */}

          <p style={{ fontStyle: 'italic', margin: '0.5rem 0 0.5rem 2rem', fontSize: '9.5pt' }}>
            Provided that if the allottee delays in payment towards any amount for which payable, he shall be liable to pay interest at the rate specified in the Rules.
          </p>

          <p className="legal-section-title">2. Mode of Payment:</p>
          <p style={{ textIndent: '2rem' }}>
            Subject to the terms of the Agreement and the Promoter abiding by the construction milestones, the Allottee shall make all payments, on demand by the Promoter, within the stipulated time as mentioned in the Payment Plan through A/c Payee cheque/demand draft or online payment (as applicable) in favour of '<SpanVal val={paymentFavourOf} fieldKey="paymentFavourOf" />' payable at <SpanVal val={paymentPayableAt} fieldKey="paymentPayableAt" />.
          </p>

          <p className="legal-section-title">3. Compliance of Laws relating to remittances:</p>
          <div className="indent-1">
            3.1 The Allottee, if resident outside India, shall be solely responsible for complying with the necessary formalities as laid down in Foreign Exchange Management Act, 1999 (Central Act 42 of 1999) , Reserve Bank of India Act and Rules and Regulations made thereunder or any statutory amendment(s) modification(s) made thereof and all other applicable laws including that of remittance of payment acquisition/sale/transfer of immovable properties in India etc. and provide the Promoter with such permission, approvals which would enable the Promoter to fulfill its obligations under this Agreement. Any refund, transfer of security, if provided in terms of the Agreement shall be made in accordance with the provisions of Foreign Exchange Management Act, 1999 or statutory enactments or amendments thereof and the Rules and Regulations of the Reserve Bank of India or any other applicable law. The Allottee understands and agrees that in the event of any failure on his/her part to comply with the applicable guidelines issued by the Reserve Bank of India, he/she shall be liable for any action under the Foreign Exchange Management Act, 1999 or other laws as applicable, as amended from time to time.
          </div>

          <div className="indent-1">
            3.2 The Promoter accepts no responsibility in this regard. The Allottee shall keep the Promoter fully indemnified and harmless in this regard. Whenever there is any change in the residential status of the Allottee subsequent to the signing of this Agreement, it shall be the sole responsibility of the Allottee to intimate the same in writing to the Promoter immediately and comply with necessary formalities if any under the applicable laws. The Promoter shall not be responsible towards any third party making payment/remittances on behalf of any Allottee and such third party shall not have any right in the application/allotment of the said apartment applied for herein in any way and the Promoter shall be issuing the payment receipts in favour of the Allottee only.
          </div>

          <p className="legal-section-title">4. Adjustment/Appropriation of payments:</p>
          <p style={{ textIndent: '2rem' }}>
            The Allottee authorizes the Promoter to adjust/appropriate all payments made by him/her under any head(s) of dues against lawful outstanding, if any, in his/her name as the Promoter may in its sole discretion deem fit and the Allottee undertakes not to object/demand/direct the Promoter to adjust his payments in any manner.
          </p>

          <p className="legal-section-title">5. Time is essence:</p>
          <div className="indent-1">
            5.1 Time is of essence for the Promoter as well as the Allottee. The Promoter shall abide by the time schedule for completing the project and handing over the (Apartment/Plot) to the Allottee and the common areas to the association of the allottees after receiving the occupancy certificate* or the completion certificate or both, as the case may be. Similarly, the Allottee shall make timely payments of the installment and other dues payable by him/her and meeting the other obligations under the Agreement subject to the simultaneous completion of construction by the Promoter as provided in Schedule C (<b>"Payment Plan"</b>).
          </div>

          <p className="legal-section-title">6. Construction of the Project/Apartment:</p>
          <p style={{ textIndent: '2rem' }}>
            The Allottee has seen the specifications of the (Apartment/Plot) and accepted the Payment Plan, floor plans, layout plans (annexured along with this Agreement) which has been approved by the competent authority, as represented by the Promoter. The Promoter shall develop the Project in accordance with the said layout plans, floor plans and specifications. Subject to the terms in this Agreement, the Promoter undertakes to strictly abide by the bye-laws, FAR and density norms and provisions prescribed by the prevailing Development Control Regulations in the locality  and shall not have an option to make any variation/modification in such plans, other than in the manner provided under the Act, and breach of this term by the Promoter shall constitute a material breach of the Agreement.
          </p>

          <p className="legal-section-title">7. Possession of the Apartment/Plot:</p>
          <div className="indent-1">
            7.1 <i>Schedule for possession of the said (Apartment/Plot):</i> The Promoter agrees and understands that timely delivery of possession of the (Apartment/Plot) is the essence of the Agreement. The Promoter, based on the approved plans and specifications, assures to hand over possession of the (Apartment/Plot) on <SpanVal val={formatDateDMY(possessionTargetMonth)} fieldKey="possessionTargetMonth" /> unless there is delay or failure due to war, flood, drought, fire, cyclone, earthquake or any other calamity caused by nature affecting the regular development of the real estate project (<b>"Force Majeure"</b>). If, however, the completion of the Project is delayed due to the Force Majeure conditions then the Allottee agrees that the Promoter shall be entitled to the extension of time for delivery of possession of the (Apartment/Plot), provided that such Force Majeure conditions are not of a nature which make it impossible for the contract to be implemented. The Allottee agrees and confirms that, in the event it becomes impossible for the Promoter to implement the project due to Force Majeure conditions, then this allotment shall stand terminated and the Promoter shall refund to the Allottee the entire amount received by the Promoter from the allotment within 45 days from that date. After refund of the money paid by the Allottee, Allottee agrees that he/she shall not have any rights, claims etc. against the Promoter and that the Promoter shall be released and discharged from all its obligations and liabilities under this Agreement.
          </div>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            7.2 <i>Procedure for taking possession:</i> The Promoter, upon obtaining the occupancy certificate* from the competent authority shall offer in writing the possession of the (Apartment/Plot), to the Allottee in terms of this Agreement to be taken within 3 (three) months from the date of issue of such notice and the Promoter shall give possession of the (Apartment/Plot) to the Allottee. The Promoter agrees and undertakes to indemnify the Allottee in case of failure of fulfillment of any of the provisions, formalities, documentation on part of the Promoter. The Allottee agree(s) to pay the maintenance charges as determined by the Promoter/association of allottees, as the case may be. The Promoter on its behalf shall offer the possession to the Allottee in writing within <SpanVal val={gracePeriodDays} fieldKey="gracePeriodDays" /> days of receiving the occupancy certificate* of the Project.
          </div>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            7.3 <i>Failure of Allottee to take Possession of (Apartment/Plot):</i> Upon receiving a written intimation from the Promoter as per clause 7.2, the Allottee shall take possession of the (Apartment/Plot) from the Promoter by executing necessary indemnities, undertakings and such other documentation as prescribed in this Agreement, and the Promoter shall give possession of the (Apartment/Plot) to the allottee. In case the Allottee fails to take possession within the time provided in clause 7.2, such Allottee shall continue to be liable to pay maintenance charges as applicable.
          </div>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            7.4 <i>Possession by the Allottee:</i> After obtaining the occupancy certificate* and handing over physical possession of the (Apartment/Plot) to the Allottees, it shall be the responsibility of the Promoter to hand over the necessary documents and plans, including common areas, to the association of the Allottees or the competent authority, as the case may be, as per the local laws.
          </div>

          <div className="indent-1" style={{ marginTop: '1.5rem' }}>
            7.5 <i>Cancellation by Allottee:</i> The Allottee shall have the right to cancel/withdraw his allotment in the Project as provided in the Act:
            <div style={{ fontStyle: 'italic', marginTop: '0.25rem', fontSize: '9.5pt', textIndent: '2rem' }}>
              Provided that where the allottee proposes to cancel/withdraw from the project without any fault of the promoter, the promoter herein is entitled to forfeit the booking amount paid for the allotment. The balance amount of money paid by the allottee shall be returned by the promoter to the allottee within 45 days of such cancellation.
            </div>
          </div>

          <div className="indent-1" style={{ marginTop: '1.5rem' }}>
            7.6 <i>Compensation:</i> The Promoter shall compensate the Allottee in case of any loss caused to him due to defective title of the land, on which the project is being developed or has been developed, in the manner as provided under the Act and the claim for compensation under this section shall not be barred by limitation provided under any law for the time being in force.
            <p style={{ textIndent: '2rem', marginTop: '0.25rem' }}>
              Except for occurrence of a Force Majeure event, if the promoter fails to complete or is unable to give possession of the (Apartment/Plot) (i) in accordance with the terms of this Agreement, duly completed by the date specified herein; or (ii) due to discontinuance of his business as a developer on account of suspension or revocation of the registration under the Act; or for any other reason; the Promoter shall be liable, on demand to the Allottee, in case the Allottee wishes to withdraw from the Project, without prejudice to any other remedy available, to return the total amount received by him in respect of the (Apartment/Plot), with interest at the rate specified in the Rules within 45 days including compensation in the manner as provided under the Act.
            </p>
            <p style={{ textIndent: '2rem', marginTop: '0.25rem' }}>
              Provided that where if the Allottee does not intend to withdraw from the Project, the Promoter shall pay the Allottee interest  at the rate specified in the Rules  for every month of delay, till the handing over of the possession of the (Apartment/Plot).
            </p>
          </div>

          <p className="legal-section-title">8. Representations and warranties of the Promoter:</p>
          <p style={{ textIndent: '2rem' }}>
            The Promoter hereby represents and warrants to the Allottee as follows:—
          </p>
          <div className="indent-1">
            (i) The (Promoter) has absolute, clear and marketable title with respect to the said Land; the requisite rights to carry out development upon the said Land and absolute, actual, physical and legal possession of the said Land for the Project;
          </div>
          <div className="indent-1">
            (ii) The Promoter has lawful rights and requisite approvals from the competent authorities to carry out development of the Project;
          </div>

          <div className="indent-1" data-field="hasEncumbrances">
            {hasEncumbrances === 'yes' ? (
              <>
                (iii) There are encumbrances upon the said Land or the Project, the details of which are as follows:
                <div
                  data-field="encumbranceDetails"
                  style={{ marginTop: '0.25rem', paddingLeft: '0.5rem', whiteSpace: 'pre-wrap' }}
                >
                  <SpanVal val={encumbranceDetails} fallback="(Please provide details of such encumbrances including any rights, title, interest and name of party in or over such land)" fieldKey="encumbranceDetails" />
                </div>
              </>
            ) : (
              <>(iii) There are no encumbrances upon the said Land or the Project;</>
            )}
          </div>

          <div className="indent-1">
            (iv) There are no litigations pending before any Court of law with respect to the said Land, Project or the (Apartment/Plot);
          </div>
          <div className="indent-1">
            (v) All approvals, licenses and permits issued by the competent authorities with respect to the Project, said Land and (Apartment/Plot) are valid and subsisting and have been obtained by following due process of law. Further, the Promoter has been and shall, at all times, remain to be in compliance with all applicable laws in relation to the Project, said Land, Building and (Apartment/Plot) and common areas;
          </div>
          <div className="indent-1">
            (vi) The Promoter has the right to enter into this Agreement and has not committed or omitted to perform any act or thing, whereby the right, title and interest of the Allottee created herein, may prejudicially be affected;
          </div>
          <div className="indent-1">
            (vii) The Promoter has not entered into any agreement for sale and/or development agreement or any other agreement/arrangement with any person or party with respect to the said Land, including the Project and the said (Apartment/Plot) which will, in any manner, affect the rights of Allottee under this Agreement;
          </div>
          <div className="indent-1">
            (viii) The Promoter confirms that the Promoter is not restricted in any manner whatsoever from selling the said (Apartment/Plot) to the Allottee in the manner contemplated in this Agreement;
          </div>
          <div className="indent-1">
            (ix) At the time of execution of the conveyance deed the Promoter shall handover lawful, vacant, peaceful, physical possession of the (Apartment/Plot) to the Allottee and the common areas to the Association of the Allottees;
          </div>
          <div className="indent-1">
            (x) The Schedule Property is not the subject matter of any HUF and that no part thereof is owned by any minor and/or no minor has any right, title and claim over the Schedule Property;
          </div>
          <div className="indent-1">
            (xi) The Promoter has duly paid and shall continue to pay and discharge all governmental dues, rates, charges and taxes and other monies, levies, impositions, premiums, damages and/or penalties and other outgoings, whatsoever, payable with respect to the said project to the competent Authorities;
          </div>
          <div className="indent-1">
            (xii) No notice from the Government or any other local body or authority or any legislative enactment, Government ordinance, order, notification (including any notice for acquisition or requisition of the said property) has been received by or served upon the Promoter in respect of the said Land and/or the Project.
          </div>

          <p className="legal-section-title">9. Events of defaults and consequences:</p>
          <div className="indent-1">
            9.1 Subject to the Force Majeure clause, the Promoter shall be considered under a condition of Default, in the following events:
            <div className="indent-2" style={{ marginTop: '0.25rem' }}>
              (i) Promoter fails to provide ready to move in possession of the (Apartment/Plot) to the Allottee within the time period specified. For the purpose of this clause, 'ready to move in possession' shall mean that the apartment shall be in a habitable condition which is complete in all respects;
            </div>
            <div className="indent-2">
              (ii) Discontinuance of the Promoter's business as a developer on account of suspension or revocation of his registration under the provisions of the Act or the rules or regulations made thereunder.
            </div>
          </div>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            9.2 In case of Default by Promoter under the conditions listed above, Allottee is entitled to the following:
            <div className="indent-2" style={{ marginTop: '0.25rem' }}>
              (i) Stop making further payments to Promoter as demanded by the Promoter. If the Allottee stops making payments, the Promoter shall correct the situation by completing the construction milestones and only thereafter the Allottee be required to make the next payment without any penal interest; or
            </div>
            <div className="indent-2">
              (ii) The Allottee shall have the option of terminating the Agreement in which case the Promoter shall be liable to refund the entire money paid by the Allottee under any head whatsoever towards the purchase of the apartment, along with interest at the rate specified in the Rules within forty-five days of receiving the termination notice:
            </div>
            <p style={{ textIndent: '2rem', marginTop: '0.25rem', fontSize: '9.5pt', fontStyle: 'italic' }}>
              Provided that where an Allottee does not intend to withdraw from the project or terminate the Agreement, he shall be paid, by the promoter,  interest at the rate specified in the Rules, for every month of delay till the handing over of the possession of the (Apartment/Plot).
            </p>
          </div>

          <div className="indent-1" style={{ marginTop: '1rem' }}>
            9.3 The Allottee shall be considered under a condition of Default, on the occurrence of the following events:
            <div className="indent-2" style={{ marginTop: '0.25rem' }}>
              (i) In case the Allottee fails to make payments for <SpanVal val={defaultConsecutiveDemands} fieldKey="defaultConsecutiveDemands" /> consecutive demands made by the Promoter as per the Payment Plan annexed hereto, despite having been issued notice in that regard the allottee shall be liable to pay interest to the promoter on the unpaid amount at the rate specified in the Rules.
            </div>
            <div className="indent-2">
              (ii) In case of Default by Allottee under the condition listed above continues for a period beyond <SpanVal val={defaultConsecutiveMonths} fieldKey="defaultConsecutiveMonths" /> consecutive months after notice from the Promoter in this regard, the Promoter shall cancel the allotment of the (Apartment/Plot) in favour of the Allottee and refund the amount money paid by him to the allottee by deducting the booking amount and the interest liabilities and this Agreement shall thereupon stand terminated.
            </div>
          </div>

          <p className="legal-section-title">10. Conveyance of the said apartment:</p>
          <p style={{ textIndent: '2rem' }}>
            The Promoter, on receipt of complete amount of the Price of the (Apartment/Plot) under the Agreement from the Allottee, shall execute a conveyance deed and convey the title of the (Apartment/Plot) together with proportionate undivided share in the Common Areas within 3 (three) months from the issuance of the occupancy certificate*. However, in case the Allottee fails to deposit the stamp duty, registration charges and all other incidental and legal expenses etc. so demanded within the period mentioned in the demand letter, the Allottee authorizes the Promoter to withhold registration of the conveyance deed in his/her favour till full and final settlement of all dues and stamp duty and registration charges to the Promoter is made by the Allottee. The Allottee shall be solely responsible and liable for compliance of the provisions of <SpanVal val="Kerala Stamp Act, 1959" /> including any actions taken or deficiencies/penalties imposed by the competent authority(ies).
          </p>

          <p className="legal-section-title">11. Maintenance of the said building/apartment/project:</p>
          <p style={{ textIndent: '2rem' }}>
            The Promoter shall be responsible to provide and maintain essential services in the Project till the taking over of the maintenance of the project by the association of the allottees. The cost of such maintenance has been included in the Total Price of the (Apartment/Plot).
          </p>
          <div style={{ paddingLeft: '2rem' }}>
            <div
              className={`placeholder-field-block ${!maintenanceClauses || maintenanceClauses.trim() === '' ? 'empty' : ''}`}
              data-field="maintenanceClauses"
            >
              {maintenanceClauses && maintenanceClauses.trim() !== '' ? maintenanceClauses : "(Insert any other clauses in relation to maintenance of project, infrastructure and equipment)"}
            </div>
          </div>

          <p className="legal-section-title">12. Defect liability:</p>
          <p style={{ textIndent: '2rem' }}>
            It is agreed that in case any structural defect or any other defect in workmanship, quality or provision of services or any other obligations of the Promoter as per the agreement for sale relating to such development is brought to the notice of the Promoter within a period of 5 (five) years by the Allottee from the date of handing over possession, it shall be the duty of the Promoter to rectify such defects without further charge, within 30 (thirty) days, and in the event of Promoter's failure to rectify such defects within such time, the aggrieved Allottees shall be entitled to receive appropriate compensation in the manner as provided under the Act.
          </p>

          <p className="legal-section-title">13. Right of allottee to use common areas and facilities subject to payment of total maintenance charges:</p>
          <p style={{ textIndent: '2rem' }}>
            The Allottee hereby agrees to purchase the (Apartment/Plot) on the specific understanding that his/her right to the use of Common Areas shall be subject to timely payment of total maintenance charges, as determined and thereafter billed by the maintenance agency appointed or the association of allottees (or the maintenance agency appointed by it) and performance by the Allottee of all his/her obligations in respect of the terms and conditions specified by the maintenance agency or the association of allottees from time to time.
          </p>

          <p className="legal-section-title">14. Right to enter the apartment for repairs:</p>
          <p style={{ textIndent: '2rem' }}>
            The Promoter/maintenance agency/association of allottees shall have rights of unrestricted access of all Common Areas, garages/closed parking's and parking spaces for providing necessary maintenance services and the Allottee agrees to permit the association of allottees and/or maintenance agency to enter into the (Apartment/Plot) or any part thereof, after due notice and during the normal working hours, unless the circumstances warrant otherwise, with a view to set right any defect.
          </p>

          <p className="legal-section-title">15. Usage:</p>
          <p style={{ textIndent: '2rem' }}>
            Use of Basement and Service Areas.— The basement(s) and service areas, if any, as located within the <SpanVal val={facilitiesOutsideProject} fieldKey="facilitiesOutsideProject" /> (Project name) shall be earmarked for purposes such as parking spaces and services including but not limited to electric sub-station, transformer, DG set rooms, underground water tanks, pump rooms, maintenance and service rooms, fire fighting pumps and equipment's etc. and other permitted uses as per sanctioned plans. The Allottee shall not be permitted to use the services areas and the basements in any manner whatsoever, other than those earmarked as parking spaces, and the same shall be reserved for use by the association of allottees formed by the Allottees for rendering maintenance services.
          </p>

          <p className="legal-section-title">16. General compliance with respect to the apartment:</p>
          <p style={{ textIndent: '2rem' }}>
            Subject to Clause 12 above, the Allottee shall, after taking possession, be solely responsible to maintain the (Apartment/Plot) at his/her own cost, in good repair and condition and shall not do or suffer to be done anything in or to the Building, or the (Apartment/Plot), or the staircases, lifts, common passages, corridors, circulation areas, atrium or the compound which may be in violation of any laws or rules of any authority or change or alter or make additions to the (Apartment/Plot) and keep the (Apartment/Plot), its walls and partitions, sewers, drains, pipe and appurtenances thereto or belonging thereto, in good and tenantable repair and maintain the same in a fit and proper condition and ensure that the support, shelter etc. of the Building is not in any way damaged or jeopardized. The Allottee further undertakes, assures and guarantees that he/she will not put any sign-board/name-plate, neon light, publicity material or advertisement material etc. on the face/facade of the Building or anywhere on the exterior of the Project, buildings therein or Common Areas. The Allottees shall also not change the colour scheme of the outer walls or painting of the exterior side of the windows or carry out any change in the exterior elevation or design. Further the Allottee shall not store any hazardous or combustible goods in the (Apartment/Plot) or place any heavy material in the common passages or staircase of the Building. The Allottee shall also not remove any wall, including the outer and load bearing wall of the (Apartment/Plot). The Allottee shall plan and distribute its electrical load in conformity with the electrical systems installed by the Promoter and thereafter the association of allottees and/or maintenance agency appointed by association of allottees. The Allottee shall be responsible for any loss or damages arising out of breach of any of the aforesaid conditions.
          </p>

          <p className="legal-section-title">17. Compliance of laws, notifications etc. by Allottee:</p>
          <p style={{ textIndent: '2rem' }}>
            The Allottee is entering into this Agreement for the allotment of a (Apartment/Plot) with the full knowledge of all laws, rules, regulations, notifications applicable to the Project in general and this project in particular. That the Allottee hereby undertakes that he/she shall comply with and carry out, from time to time after he/she has taken over for occupation and use the said (Apartment/Plot), all the requirements, requisitions, demands and repairs which are required by any competent Authority in respect of the (Apartment/Plot) at his/her own cost.
          </p>

          <p className="legal-section-title">18. Additional constructions:</p>
          <p style={{ textIndent: '2rem' }}>
            The Promoter undertakes that it has no right to make additions or to put up additional structure(s) anywhere in the Project after the building plan has been approved by the competent authority(ies) except for as provided in the Act.
          </p>

          <p className="legal-section-title">19. Promoter shall not mortgage or create a charge:</p>
          <p style={{ textIndent: '2rem' }}>
            After the Promoter executes this Agreement he shall not mortgage or create a charge on the (Apartment/Plot/Building) and if any such mortgage or charge is made or created then notwithstanding anything contained in any other law for the time being in force, such mortgage or charge shall not affect the right and interest of the Allottee who has taken or agreed to take such (Apartment/Plot/Building).
          </p>

          <p className="legal-section-title">20. Apartment ownership Act:</p>
          <p style={{ textIndent: '2rem' }}>
            The Promoter has assured the Allottees that the project in its entirety is in accordance with the provisions of the Kerala Apartment Owners Act, 1983 (5 of 1984) (Please insert the name of the state Apartment Ownership Act). The Promoter showing compliance of various laws/regulations as applicable in the State.
          </p>

          <p className="legal-section-title">21. Binding effect:</p>
          <p style={{ textIndent: '2rem' }}>
            Forwarding this Agreement to the Allottee by the Promoter does not create a binding obligation on the part of the Promoter or the Allottee until, firstly, the Allottee signs and delivers this Agreement with all the schedules along with the payments due as stipulated in the Payment Plan within 30 (thirty) days from the date of receipt by the Allottee and secondly, appears for registration of the same before the concerned Sub-Registrar as and when intimated by the Promoter. If the Allottee(s) fails to execute and deliver to the Promoter this Agreement within 30 (thirty) days from the date of its receipt by the Allottee and/or appear before the Sub-Registrar for its registration as and when intimated by the Promoter, then the Promoter shall serve a notice to the Allottee for rectifying the default, which if not rectified within 30 (thirty) days from the date of its receipt by the Allottee, application of the Allottee shall be treated as cancelled and all sums deposited by the Allottee in connection therewith including the booking amount shall be returned to the Allottee without any interest or compensation whatsoever.
          </p>

          <p className="legal-section-title">22. Entire agreement:</p>
          <p style={{ textIndent: '2rem' }}>
            This Agreement, along with its schedules, constitutes the entire Agreement between the Parties with respect to the subject matter hereof and supersedes any and all understandings, any other agreements, allotment letter, correspondences, arrangements whether written or oral, if any, between the Parties in regard to the said apartment/plot/building, as the case may be.
          </p>

          <p className="legal-section-title">23. Right to amend:</p>
          <p style={{ textIndent: '2rem' }}>
            This Agreement may only be amended through written consent of the Parties.
          </p>

          <p className="legal-section-title">24. Provisions of this agreement applicable on Allottee/subsequent Allottees:</p>
          <p style={{ textIndent: '2rem' }}>
            It is clearly understood and so agreed by and between the Parties hereto that all the provisions contained herein and the obligations arising hereunder in respect of the Project shall equally be applicable to and enforceable against any subsequent Allottees of the (Apartment/Plot), in case of a transfer, as the said obligations go along with the (Apartment/Plot) for all intents and purposes.
          </p>

          <p className="legal-section-title">25. Waiver not a limitation to enforce:</p>
          <div className="indent-1">
            25.1 The Promoter may, at its sole option and discretion, without prejudice to its rights as set out in this Agreement, waive the breach by the Allottee in not making payments as per the Payment Plan including waiving the payment of interest for delayed payment.
          </div>

          <div style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
            It is made clear and so agreed by the Allottee that exercise of discretion by the Promoter in the case of one Allottee shall not be construed to be a precedent and/or binding on the Promoter to exercise such discretion in the case of other Allottees.
          </div>
          <div className="indent-1">
            25.2 Failure on the part of the Promoter to enforce at any time or for any period of time the provisions hereof shall not be construed to be a waiver of any provisions or of the right thereafter to enforce each and every provision.
          </div>

          <p className="legal-section-title">26. Severability:</p>
          <p style={{ textIndent: '2rem' }}>
            If any provision of this Agreement shall be determined to be void or unenforceable under the Act or the Rules and Regulations made thereunder or under other applicable laws, such provisions of the Agreement shall be deemed amended or deleted in so far as reasonably inconsistent with the purpose of this Agreement and to the extent necessary to conform to Act or the Rules and Regulations made thereunder or the applicable law, as the case may be, and the remaining provisions of this Agreement shall remain valid and enforceable as applicable at the time of execution of this Agreement.
          </p>

          <p className="legal-section-title">27. Method of calculation of proportionate share wherever referred to in the agreement:</p>
          <p style={{ textIndent: '2rem' }}>
            Wherever in this Agreement it is stipulated that the Allottee has to make any payment, in common with other Allottee(s) in Project, the same shall be the proportion which the carpet area of the (Apartment/Plot) bears to the total carpet area of all the (Apartments/Plots) in the Project.
          </p>

          <p className="legal-section-title">28. Further assurances:</p>
          <p style={{ textIndent: '2rem' }}>
            Both Parties agree that they shall execute, acknowledge and deliver to the other such instruments and take such other actions, in additions to the instruments and actions specifically provided for herein, as may be reasonably required in order to effectuate the provisions of this Agreement or of any transaction contemplated herein or to confirm or perfect any right to be created or transferred hereunder or pursuant to any such transaction.
          </p>

          <p className="legal-section-title">29. Place of execution:</p>
          <p style={{ textIndent: '2rem' }}>
            The execution of this Agreement shall be complete only upon its execution by the Promoter through its authorized signatory at the Promoter's Office, or at some other place, which may be mutually agreed between the Promoter and the Allottee, in <SpanVal val={placeOfExecution} fieldKey="placeOfExecution" /> after the Agreement is duly executed by the Allottee and the Promoter or simultaneously with the execution the said Agreement shall be registered at the office of the Sub-Registrar. Hence this Agreement shall be deemed to have been executed at <SpanVal val={placeOfDeemedExecution} fieldKey="placeOfDeemedExecution" />.
          </p>

          <p className="legal-section-title">30. Notices:</p>
          <p style={{ textIndent: '2rem' }}>
            That all notices to be served on the Allottee and the Promoter as contemplated by this Agreement shall be deemed to have been duly served if sent to the Allottee or the Promoter by Registered Post at their respective addresses specified below:
          </p>

          <div style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
            <p style={{ margin: '0.25rem 0' }}><b>Name of Allottee:</b> <SpanVal val={allotteeType === 'individual' ? allotteeIndividual.name : allotteeType === 'company' ? allotteeCompany.name : allotteeType === 'partnership' ? allotteePartnership.name : allotteeHuf.kartaName} /></p>
            <p style={{ margin: '0.25rem 0' }}><b>Allottee Address:</b> <SpanVal val={allotteeType === 'individual' ? allotteeIndividual.residing : allotteeType === 'company' ? allotteeCompany.registeredOffice : allotteeType === 'partnership' ? allotteePartnership.businessPlace : allotteeHuf.place} /></p>

            <p style={{ margin: '1rem 0 0.25rem 0' }}><b>Promoter Name:</b> <SpanVal val={promoterType === 'company' ? promoterCompany.name : promoterType === 'partnership' ? promoterPartnership.name : promoterIndividual.name} /></p>
            <p style={{ margin: '0.25rem 0' }}><b>Promoter Address:</b> <SpanVal val={promoterType === 'company' ? promoterCompany.registeredOffice : promoterType === 'partnership' ? promoterPartnership.businessPlace : promoterIndividual.residing} /></p>
          </div>

          <p style={{ textIndent: '2rem', marginTop: '1rem' }}>
            It shall be the duty of the Allottee and the promoter to inform each other of any change in address subsequent to the execution of this Agreement in the above address by Registered Post failing which all communications and letters posted at the above address shall be deemed to have been received by the promoter or the Allottee, as the case may be.
          </p>

          <p className="legal-section-title">31. Joint Allottees:</p>
          <p style={{ textIndent: '2rem' }}>
            That in case there are Joint Allottees all communications shall be sent by the Promoter to the Allottee whose name appears first and at the address given by him/her which shall for all intents and purposes to consider as properly served on all the Allottees.
          </p>

          <p className="legal-section-title">32. Governing law:</p>
          <p style={{ textIndent: '2rem' }}>
            That the rights and obligations of the parties under or arising out of this Agreement shall be construed and enforced in accordance with the laws of India for the time being in force.
          </p>

          <p className="legal-section-title">33. Dispute resolution:</p>
          <p style={{ textIndent: '2rem' }}>
            All or any disputes arising out of or touching upon or in relation to the terms and conditions of this Agreement, including the interpretation and validity of the terms thereof and the respective rights and obligations of the Parties, shall be settled amicably by mutual discussion, failing which the same shall be settled through the adjudicating officer appointed under the Act.
          </p>
          <div style={{ paddingLeft: '2rem' }}>
            <div
              className={`placeholder-field-block ${!additionalTerms || additionalTerms.trim() === '' ? 'empty' : ''}`}
              data-field="additionalTerms"
            >
              {additionalTerms && additionalTerms.trim() !== '' ? additionalTerms : "(Please insert any other terms and conditions as per the contractual understanding between the parties, however, please ensure that such additional terms and conditions are not in derogation of or inconsistent with the terms and conditions set out above or the Act and the Rules and Regulations made thereunder.)"}
            </div>
          </div>

          <p style={{ marginTop: '0.5rem' }}>
            IN WITNESS WHEREOF parties herein above named have set their respective hands and signed this Agreement for sale at <SpanVal val={executionPlace} fieldKey="executionPlace" /> in the presence of attesting witness, signing as such on the day first above written.
          </p>

          <p style={{ fontWeight: 'bold', textTransform: 'uppercase', marginTop: '1rem', borderBottom: '1px solid #000', paddingBottom: '0.2rem' }}>
            Signed and Delivered by the within Named
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
            <div>
              <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Allottee: (including joint buyers)</p>
              <div className="photo-box">
                Please affix photograph and sign across the photograph
              </div>

              <div className="signature-row" style={{ marginTop: '2.5rem' }}>
                (1) Signature: __________________
                <br />
                Name: <SpanVal val={allotteeType === 'individual' ? allotteeIndividual.name : allotteeType === 'company' ? allotteeCompany.name : allotteeType === 'partnership' ? allotteePartnership.name : allotteeHuf.kartaName} fallback="__________________" />
              </div>

              {jointAllottees.map((ja, idx) => (
                <div className="signature-row" style={{ marginTop: '1.5rem' }} key={ja.id}>
                  ({idx + 2}) Signature: __________________
                  <br />
                  Name: <SpanVal val={ja.name} fieldKey="jointAllottees" fallback="__________________" />
                </div>
              ))}

              <p style={{ fontSize: '9.5pt', marginTop: '1rem' }}>
                At <SpanVal val={executionPlace} fieldKey="executionPlace" /> on ______________ in the presence of:
              </p>
            </div>

            <div>
              <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Promoter: </p>
              <div className="photo-box">
                Please affix photograph and sign across the photograph
              </div>

              <div className="signature-row" style={{ marginTop: '2.5rem' }}>
                Signature: __________________
                <br />
                Name: <SpanVal val={promoterType === 'company' ? promoterCompany.authorizedSignatory : promoterType === 'partnership' ? promoterPartnership.authorizedPartner : promoterIndividual.name} fallback="__________________" />
                <br />
                Designation: <SpanVal val={promoterType === 'company' ? 'Authorized Signatory' : promoterType === 'partnership' ? 'Authorized Partner' : 'Individual'} fallback="__________________" />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid #000', paddingTop: '0.5rem' }}>
            <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>WITNESSES:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {witnesses.map((w, idx) => (
                <div key={w.id || idx} style={{ fontSize: '9.5pt' }}>
                  <b>{idx + 1}. Signature:</b> ___________________
                  <br />
                  <b>Name:</b> <SpanVal val={w.name} fieldKey="witnesses" fallback="__________________" />
                  <br />
                  <b>Address:</b> <SpanVal val={w.address} fieldKey="witnesses" fallback="__________________" />
                </div>
              ))}
              {witnesses.length === 0 && (
                <div style={{ fontSize: '9pt', color: '#666', gridColumn: 'span 2' }}>
                  No witnesses specified. Add witness details in the form.
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '1rem', borderTop: '1.5px solid #000', paddingTop: '0.5rem', fontSize: '9pt', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <div><b>Schedule 'A'</b> - Please insert description of the (Apartment/Plot) and the garage/closed parking (if applicable) along with boundaries in all four directions.</div>
            <div><b>Schedule 'B'</b> - Floor plan of the apartment.</div>
            <div><b>Schedule 'C'</b> - Payment plan by the Allottee.</div>
            <div><b>Schedule 'D'</b> - Details of Common Areas and Facilities.</div>
          </div>

          <p style={{ fontSize: '8pt', borderTop: '0.5px solid #000', marginTop: '0.5rem', paddingTop: '0.25rem', paddingBottom: '2rem' }}>
            * or such other certificate by whatever name called issued by the competent authority.
          </p>
        </div>
      </div>

    </div>
  );
}
