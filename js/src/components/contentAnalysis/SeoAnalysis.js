/* globals wpseoAdminL10n */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Slot } from "@wordpress/components";
import { __, sprintf } from "@wordpress/i18n";
import { getRtlStyle, KeywordInput, colors, utils, Checkbox } from "yoast-components";
import Collapsible from "../SidebarCollapsible";
import Results from "./Results";
import { setFocusKeyword } from "../../redux/actions/focusKeyword";
import getIndicatorForScore from "../../analysis/getIndicatorForScore";
import { getIconForScore } from "./mapResults";
import KeywordSynonyms from "../modals/KeywordSynonyms";
import Modal from "../modals/Modal";
import MultipleKeywords from "../modals/MultipleKeywords";
import YoastSeoIcon from "yoast-components/composites/basic/YoastSeoIcon";
import Icon from "yoast-components/composites/Plugin/Shared/components/Icon";
import AnalysisUpsell from "../AnalysisUpsell";

const AnalysisHeader = styled.span`
	font-size: 1em;
	font-weight: bold;
	margin: 1.5em 0 1em;
	display: block;
`;

export const HelpLink = utils.makeOutboundLink( styled.a`
	display: inline-block;
	position: relative;
	outline: none;
	text-decoration: none;
	border-radius: 100%;
	width: 24px;
	height: 24px;
	margin: -4px 0;
	vertical-align: middle;

	&::before {
		position: absolute;
		top: 0;
		left: 0;
		padding: 2px;
		content: "\f223";
	}
` );

const StyledContainer = styled.div`
	min-width: 600px;

	@media screen and ( max-width: 680px ) {
		min-width: 0;
		width: 86vw;
	}
`;

const StyledIcon = styled( Icon )`
	float: ${ getRtlStyle( "right", "left" ) };
	margin: ${ getRtlStyle( "0 0 16px 16px", "0 16px 16px 0" ) };

	&& {
		width: 150px;
		height: 150px;

		@media screen and ( max-width: 680px ) {
			width: 80px;
			height: 80px;
		}
	}
`;

const CheckboxContainer = styled.div`
	margin-bottom: 8px;
`;

/**
 * Redux container for the seo analysis.
 */
class SeoAnalysis extends React.Component {
	/**
	 * Renders the keyword synonyms upsell modal.
	 *
	 * @param {string} location The location of the upsell component. Used to determine the shortlinks in the component.
	 *
	 * @returns {ReactElement} A modalButtonContainer component with the modal for a keyword synonyms upsell.
	 */
	renderSynonymsUpsell( location ) {
		const modalProps = {
			appElement: "#wpwrap",
			openButtonIcon: "",
			classes: {
				openButton: "wpseo-keyword-synonyms button-link",
			},
			labels: {
				open: "+ " + __( "Add synonyms", "wordpress-seo" ),
				a11yNotice: {
					opensInNewTab: __( "(Opens in a new browser tab!)", "wordpress-seo" ),
				},
				modalAriaLabel: sprintf(
					/* translators: %s expands to 'Yoast SEO Premium'. */
					__( "Get %s", "wordpress-seo" ),
					"Yoast SEO Premium"
				),
				heading: sprintf(
					/* translators: %s expands to 'Yoast SEO Premium'. */
					__( "Get %s", "wordpress-seo" ),
					"Yoast SEO Premium"
				),
			},
		};

		// Defaults to metabox.
		let link    = wpseoAdminL10n[ "shortlinks.upsell.metabox.focus_keyword_synonyms_link" ];
		let buyLink = wpseoAdminL10n[ "shortlinks.upsell.metabox.focus_keyword_synonyms_button" ];

		if ( location.toLowerCase() === "sidebar" ) {
			link    = wpseoAdminL10n[ "shortlinks.upsell.sidebar.focus_keyword_synonyms_link" ];
			buyLink = wpseoAdminL10n[ "shortlinks.upsell.sidebar.focus_keyword_synonyms_button" ];
		}

		return (
			<Modal { ...modalProps }>
				<StyledContainer>
					<StyledIcon icon={ YoastSeoIcon } />
					<h2>{ __( "Would you like to add keyphrase synonyms?", "wordpress-seo" ) }</h2>

					<KeywordSynonyms link={ link } buyLink={ buyLink } />
				</StyledContainer>
			</Modal>
		);
	}

	/**
	 * Renders the multiple keywords upsell modal.
	 *
	 * @param {string} location The location of the upsell component. Used to determine the shortlinks in the component.
	 *
	 * @returns {ReactElement} A modalButtonContainer component with the modal for a multiple keywords upsell.
	 */
	renderMultipleKeywordsUpsell( location ) {
		const modalProps = {
			appElement: "#wpwrap",
			openButtonIcon: "",
			classes: {
				openButton: "wpseo-multiple-keywords button-link",
			},
			labels: {
				open: "+ " + __( "Add related keyphrase", "wordpress-seo" ),
				a11yNotice: {
					opensInNewTab: __( "(Opens in a new browser tab!)", "wordpress-seo" ),
				},
				modalAriaLabel: sprintf(
					/* translators: %s expands to 'Yoast SEO Premium'. */
					__( "Get %s", "wordpress-seo" ),
					"Yoast SEO Premium"
				),
				heading: sprintf(
					/* translators: %s expands to 'Yoast SEO Premium'. */
					__( "Get %s", "wordpress-seo" ),
					"Yoast SEO Premium"
				),
			},
		};

		// Defaults to metabox
		let link    = wpseoAdminL10n[ "shortlinks.upsell.metabox.focus_keyword_additional_link" ];
		let buyLink = wpseoAdminL10n[ "shortlinks.upsell.metabox.focus_keyword_additional_button" ];

		if ( location.toLowerCase() === "sidebar" ) {
			link    = wpseoAdminL10n[ "shortlinks.upsell.sidebar.focus_keyword_additional_link" ];
			buyLink = wpseoAdminL10n[ "shortlinks.upsell.sidebar.focus_keyword_additional_button" ];
		}

		return (
			<Modal { ...modalProps }>
				<StyledContainer>
					<StyledIcon icon={ YoastSeoIcon } />
					<h2>{ __( "Would you like to add a related keyphrase?", "wordpress-seo" ) }</h2>
					<MultipleKeywords
						link={ link }
						buyLink={ buyLink }
					/>
				</StyledContainer>
			</Modal>
		);
	}

	/**
	 * Renders the UpsellBox component.
	 *
	 * @param {string} location The location of the upsell component. Used to determine the shortlinks in the component.
	 *
	 * @returns {ReactElement} The UpsellBox component.
	 */
	renderKeywordUpsell( location ) {
		// Default to metabox.
		let link    = wpseoAdminL10n[ "shortlinks.upsell.metabox.additional_link" ];
		let buyLink = wpseoAdminL10n[ "shortlinks.upsell.metabox.additional_button" ];

		if ( location.toLowerCase() === "sidebar" ) {
			link    = wpseoAdminL10n[ "shortlinks.upsell.sidebar.additional_link" ];
			buyLink = wpseoAdminL10n[ "shortlinks.upsell.sidebar.additional_button" ];
		}

		return (
			<Collapsible
				prefixIcon={ { icon: "plus", color: colors.$color_grey_medium_dark } }
				prefixIconCollapsed={ { icon: "plus", color: colors.$color_grey_medium_dark } }
				title={ __( "Add related keyphrase", "wordpress-seo" ) }
			>
				<MultipleKeywords
					link={ link }
					buyLink={ buyLink }
				/>
			</Collapsible>
		);
	}

	/**
	 * Renders a help link for the keyword field.
	 *
	 * @returns {ReactElement} The help link component.
	 */
	renderKeywordHelpLink() {
		return (
			<HelpLink
				href={ wpseoAdminL10n[ "shortlinks.focus_keyword_info" ] }
				rel={ null }
				className="dashicons"
			>
				<span className="screen-reader-text">
					{ __( "Help on choosing the perfect focus keyphrase", "wordpress-seo" ) }
				</span>
			</HelpLink>
		);
	}

	/**
	 * Renders a help link for the exact match checkbox.
	 *
	 * @returns {ReactElement} The help link component.
	 */
	renderExactMatchHelpLink() {
		return (
			// Todo: change href to correct link.
			<HelpLink
				href={ wpseoAdminL10n[ "shortlinks.focus_keyword_info" ] }
				rel={ null }
				className="dashicons"
			>
				<span className="screen-reader-text">
					{ __( "Help on what exact matching means", "wordpress-seo" ) }
				</span>
			</HelpLink>
		);
	}

	/**
	 * Renders the AnalysisUpsell component.
	 *
	 * @returns {ReactElement} The AnalysisUpsell component.
	 */
	renderWordFormsUpsell() {
		return <AnalysisUpsell
			url={ this.props.location === "sidebar"
				? "https://yoa.st/morphology-upsell-sidebar"
				: "https://yoa.st/morphology-upsell-metabox" }
			alignment={ this.props.location === "sidebar" ? "vertical" : "horizontal" }
		/>;
	}

	/**
	 * Determines whether the exact match checkbox should be checked, depending on
	 * whether the keyphrase is surrounded by double quotes.
	 *
	 * Note that the analysis can handle mismatched quotes; It doesn't
	 * matter if the begin quote differs from the end quote.
	 *
	 * @param {string} keyphrase The keyword to check for double quotes.
	 *
	 * @returns {boolean} True if the checkbox should be checked.
	 */
	isCheckboxChecked( keyphrase ) {
		return keyphrase.match( /^[“”〝〞〟‟„"].*[“”〝〞〟‟„"]$/g ) !== null;
	}

	/**
	 * Renders the SEO Analysis component.
	 *
	 * @returns {ReactElement} The SEO Analysis component.
	 */
	render() {
		const score = getIndicatorForScore( this.props.overallScore );

		if ( score.className !== "loading" && this.props.keyword === "" ) {
			score.className = "na";
			score.screenReaderReadabilityText = __( "Enter a focus keyphrase to calculate the SEO score", "wordpress-seo" );
		}

		return (
			<Fragment>
				<Collapsible
					title={ __( "Focus keyphrase", "wordpress-seo" ) }
					titleScreenReaderText={ score.screenReaderReadabilityText }
					prefixIcon={ getIconForScore( score.className ) }
					prefixIconCollapsed={ getIconForScore( score.className ) }
					subTitle={ this.props.keyword }
				>
					<KeywordInput
						id="focus-keyword-input"
						onChange={ this.props.onFocusKeywordChange }
						keyword={ this.props.keyword }
						label={ __( "Focus keyphrase", "wordpress-seo" ) }
						helpLink={ this.renderKeywordHelpLink() }
					/>
					<CheckboxContainer>
						<Checkbox
							id="yoast-exact-match-checkbox"
							onChange={ event => this.props.handleCheckboxChange( event, this.props.keyword ) }
							label={ __( "Only exact matches", "wordpress-seo" ) }
							checked={ this.isCheckboxChecked( this.props.keyword ) }
							helpLink={ this.renderExactMatchHelpLink() }
						/>
					</CheckboxContainer>
					<Slot name="YoastSynonyms" />
					{ this.props.shouldUpsell && <React.Fragment>
						{ this.renderSynonymsUpsell( this.props.location ) }
						{ this.renderMultipleKeywordsUpsell( this.props.location ) }
						{ this.renderWordFormsUpsell() }
					</React.Fragment> }
					<AnalysisHeader>
						{ __( "Analysis results", "wordpress-seo" ) }
					</AnalysisHeader>
					<Results
						showLanguageNotice={ false }
						results={ this.props.results }
						marksButtonClassName="yoast-tooltip yoast-tooltip-s"
						marksButtonStatus={ this.props.marksButtonStatus }
					/>
				</Collapsible>
				{ this.props.shouldUpsell && this.renderKeywordUpsell( this.props.location ) }
			</Fragment>
		);
	}
}

SeoAnalysis.propTypes = {
	results: PropTypes.array,
	marksButtonStatus: PropTypes.string,
	hideMarksButtons: PropTypes.bool,
	keyword: PropTypes.string,
	onFocusKeywordChange: PropTypes.func,
	shouldUpsell: PropTypes.bool,
	overallScore: PropTypes.number,
	location: PropTypes.string,
};

/**
 * Maps redux state to SeoAnalysis props.
 *
 * @param {Object} state The redux state.
 * @param {Object} ownProps The component's props.
 *
 * @returns {Object} Props that should be passed to SeoAnalysis.
 */
function mapStateToProps( state, ownProps ) {
	const marksButtonStatus = ownProps.hideMarksButtons ? "disabled" : state.marksButtonStatus;

	const keyword = state.focusKeyword;

	let results = null;
	let overallScore = null;
	if ( state.analysis.seo[ keyword ] ) {
		results = state.analysis.seo[ keyword ].results;
		overallScore = state.analysis.seo[ keyword ].overallScore;
	}
	return {
		results,
		marksButtonStatus,
		keyword,
		overallScore,
	};
}

/**
 * Maps the redux dispatch to KeywordInput props.
 *
 * @param {Function} dispatch The dispatch function that will dispatch a redux action.
 *
 * @returns {Object} Props for the `KeywordInput` component.
 */
function mapDispatchToProps( dispatch ) {
	return {
		onFocusKeywordChange: ( value ) => {
			dispatch( setFocusKeyword( value ) );
		},
		handleCheckboxChange: ( event, keyphrase ) => {
			if ( typeof event !== "boolean" ) {
				return;
			}

			// Todo: Move to separate function.
			if ( event === true ) {
				// If there are already double quotes around the keyphrase, do nothing.
				if ( keyphrase.match( /^[“”〝〞〟‟„"].*[“”〝〞〟‟„"]$/g ) !== null ) {
					return;
				}

				// If the keyphrase already has a double quote at the beginning but not at the end, add the same one at the end.
				// Todo: the same one is not always appropriate (e.g. 〝 vs 〞). Find correct one by looking it up using myRegexp.exec(myString) to find captured group?
				if ( keyphrase.match( /(^[“”〝〞〟‟„"].*[^“”〝〞〟‟„"]$)/g ) !== null ) {
					const newKeyphrase = keyphrase.replace( /(^([“”〝〞〟‟„"])(.*)[^“”〝〞〟‟„"])$/g, "$1$2" );
					dispatch( setFocusKeyword( newKeyphrase ) );
					return;
				}

				// If the keyphrase already has a double quote at the end but not at the beginning, add the same one at the beginning.
				if ( keyphrase.match( /(^[^“”〝〞〟‟„"].*[“”〝〞〟‟„"]$)/g ) !== null ) {
					const newKeyphrase = keyphrase.replace( /(^[^“”〝〞〟‟„"].*([“”〝〞〟‟„"])$)/g, "$2$1" );
					dispatch( setFocusKeyword( newKeyphrase ) );
					return;
				}

				// If there are no double quotes at neither the end nor the beginning, add them.
				if ( keyphrase.match( /^[“”〝〞〟‟„"].*[“”〝〞〟‟„"]$/g ) === null ) {
					const newKeyphrase = "\"" + keyphrase + "\"";
					dispatch( setFocusKeyword( newKeyphrase ) );
					return;
				}
			}

			// Todo: Move to separate function.
			if ( event === false ) {
				// Todo: only strip characters if they are double quotes to be on the safe side?
				const newKeyphrase = keyphrase.substring( 1, keyphrase.length - 1 );
				dispatch( setFocusKeyword( newKeyphrase ) );
			}
		}
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( SeoAnalysis );
