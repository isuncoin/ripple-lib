/* @flow */
'use strict';
const _ = require('lodash');
const utils = require('./utils');
const parseFields = require('./parse/fields');
const {validate} = utils.common;
const AccountFlags = utils.common.constants.AccountFlags;

type SettingsOptions = {
  ledgerVersion?: number
}

type GetSettings = {
  passwordSpent?: boolean,
  requireDestinationTag?: boolean,
  requireAuthorization?: boolean,
  disallowIncomingXRP?: boolean,
  disableMasterKey?: boolean,
  enableTransactionIDTracking?: boolean,
  noFreeze?: boolean,
  globalFreeze?: boolean,
  defaultRipple?: boolean,
  emailHash?: ?string,
  walletLocator?: ?string,
  walletSize?: ?number,
  messageKey?: string,
  domain?: string,
  transferRate?: ?number,
  signers?: string,
  regularKey?: string
}


function parseFlags(value) {
  const settings = {};
  for (const flagName in AccountFlags) {
    if (value & AccountFlags[flagName]) {
      settings[flagName] = true;
    }
  }
  return settings;
}

function formatSettings(response) {
  const data = response.account_data;
  const parsedFlags = parseFlags(data.Flags);
  const parsedFields = parseFields(data);
  return _.assign({}, parsedFlags, parsedFields);
}

function getSettings(account: string, options: SettingsOptions = {}
): Promise<GetSettings> {
  validate.address(account);
  validate.getSettingsOptions(options);

  const request = {
    command: 'account_info',
    account: account,
    ledger_index: options.ledgerVersion || 'validated'
  };

  return this.connection.request(request).then(formatSettings);
}

module.exports = getSettings;
