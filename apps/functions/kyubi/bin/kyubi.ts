#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { KyubiStack } from '../lib/kyubi-stack';

const app = new cdk.App();
new KyubiStack(app, 'KyubiStack');
