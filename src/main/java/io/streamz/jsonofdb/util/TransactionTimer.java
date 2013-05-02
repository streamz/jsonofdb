/*
 *  Copyright 2010 bgordon.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *  under the License.
 */
package io.streamz.jsonofdb.util;

import java.math.BigDecimal;
import java.util.logging.Logger;

public class TransactionTimer {
    /*
     * Class variables.
     */

    private static final String START_MSG = "Begin transaction for: ";
    private static final String STOP_MSG = "Transaction time in %s:";
    private static final String LOG_DELIM = " for: ";
    private static final BigDecimal MILLI = BigDecimal.valueOf(1000000);
    private static final BigDecimal MICRO = BigDecimal.valueOf(1000);
    /*
     * Instance variables.
     */
    private Logger log = null;
    private long startTime = 0;
    private Resolution res = Resolution.NANOSECONDS;

    public enum Resolution {

        MILLISECONDS,
        MICROSECONDS,
        NANOSECONDS
    };

    /**
     * @param resolution
     */
    public TransactionTimer(Resolution resolution) {
        startTime = System.nanoTime();
        res = resolution;
    }

    /**
     * @param logger
     */
    public TransactionTimer(Logger logger) {
        log = logger;
        startTime = System.nanoTime();
    }

    /**
     * @param logger
     * @param resolution
     */
    public TransactionTimer(Logger logger, Resolution resolution) {
        log = logger;
        res = resolution;
        startTime = System.nanoTime();
    }

    /**
     * @param logger
     * @param msg
     */
    public TransactionTimer(Logger logger, String msg) {
        log = logger;
        startTime = System.nanoTime();

        if (logger != null) {
            logger.info(START_MSG + msg);
        }
    }

    /**
     * get the duration and write to the log.
     * @param msg
     */
    public void logTime(String msg) {
        String resolution = "nanoseconds";

        if (res == Resolution.MILLISECONDS) {
            resolution = "milliseconds";
        } else if (res == Resolution.MICROSECONDS) {
            resolution = "microseconds";
        }

        BigDecimal bd = getTime();

        if (log != null)
            log.info(String.format(STOP_MSG, resolution) + bd + LOG_DELIM + msg);
    }

    /**
     * @return
     */
    public BigDecimal getTime() {
        long result = System.nanoTime() - startTime;
        BigDecimal bd = BigDecimal.valueOf(result);

        startTime = 0;

        if (res == Resolution.MICROSECONDS)
            return bd = bd.divide(MICRO);
        else if (res == Resolution.MILLISECONDS)
            return bd.divide(MILLI);
        
        return bd;
    }
}
